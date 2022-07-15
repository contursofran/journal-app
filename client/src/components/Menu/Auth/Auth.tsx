import {
  Anchor,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  Modal,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { upperFirst, useToggle } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { AlertCircle, At, Check, Lock, User } from "tabler-icons-react";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { useStyles } from "./Auth.styles";
import { login, register } from "../../../services/authService";
import { useStore } from "../../../store";
import { AuthService } from "../../../types";
import { getNotes } from "../../../services/notesService";

function Auth({ opened, close }: { opened: boolean; close: () => void }) {
  const { classes } = useStyles();

  const setNotes = useStore((state) => state.setNotes);
  const [formError, setFormError] = useState<string>();
  const [visible, setVisible] = useState(false);
  const [type, toggle] = useToggle("login", ["login", "register"]);
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 7
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const toggleForm = () => {
    form.reset();
    toggle();
  };

  const handleRegister = async () => {
    setVisible(true);

    const { values } = form;
    const res = await register(values, setFormError);

    if (res) {
      setVisible(false);
      close();

      showNotification({
        classNames: {
          title: classes.notificationSucessTitle,
          description: classes.notificationSucessBody,
          icon: classes.notificationSucessIcon,
        },
        title: "Registration completed",
        message: "Your account has been created successfully",
        icon: <Check />,
      });
    } else {
      setVisible(false);

      switch (formError) {
        case "Firebase: Error (auth/email-already-in-use).":
          form.setFieldError("email", "Email already in use");
          break;
        case "Firebase: Error (auth/invalid-email).":
          form.setFieldError("email", "Invalid email");
          break;
        default:
          showNotification({
            classNames: {
              title: classes.notificationErrorTitle,
              description: classes.notificationErrorBody,
              icon: classes.notificationErrorIcon,
            },
            title: "Something went wrong!",
            message: "An unknown error has occurred, please try again.",
            icon: <AlertCircle />,
          });
          break;
      }
    }
  };

  const handleLogin = async () => {
    setVisible(true);
    const { values } = form;

    const res = await login(values, setFormError);

    if (res) {
      setVisible(false);
      close();
      const token = await res.getIdToken();
      const fetchNotes = async () => {
        const data = await getNotes(token);

        const fixData = data.map((note) => ({
          ...note,
          date: new Date(new Date(note.date).getTime() + 86400000), // adds 1 day to the date
        }));

        setNotes(fixData);
      };
      fetchNotes();

      showNotification({
        classNames: {
          title: classes.notificationSucessTitle,
          description: classes.notificationSucessBody,
          icon: classes.notificationSucessIcon,
        },
        title: "Login susccessful",
        message: "You are now logged in",
        icon: <Check />,
      });
    } else {
      setVisible(false);

      switch (formError) {
        case "Firebase: Error (auth/wrong-password).":
          form.setFieldError("password", "Email or password is invalid");
          form.setFieldError("email", "Email or password is invalid");
          break;
        case "Firebase: Error (auth/user-not-found).":
          form.setErrors({
            email: "Email or password is invalid",
            password: "Email or password is invalid",
          });
          break;
        case "Firebase: Error (auth/invalid-email).":
          form.setErrors({
            email: "Email or password is invalid",
            password: "Email or password is invalid",
          });
          break;
        default:
          showNotification({
            classNames: {
              title: classes.notificationErrorTitle,
              description: classes.notificationErrorBody,
              icon: classes.notificationErrorIcon,
            },
            title: "Something went wrong!",
            message: "An unknown error has occurred, please try again.",
            icon: <AlertCircle />,
          });
          break;
      }
    }
  };

  return (
    <Modal
      classNames={classes}
      centered
      opened={opened}
      onClose={close}
      size="sm"
      title={type === "login" ? "Welcome back" : "Register"}
    >
      <LoadingOverlay visible={visible} />
      <form
        onSubmit={form.onSubmit(() =>
          type === "login" ? handleLogin() : handleRegister()
        )}
      >
        <Group direction="column" grow>
          {type === "register" && (
            <TextInput
              label="Username"
              required
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              icon={<User size={14} />}
            />
          )}
          <TextInput
            label="Email"
            required
            placeholder="eg. fran@gmail.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email}
            icon={<At size={14} />}
          />

          <PasswordInput
            required
            label="Password"
            placeholder={type === "register" ? "Your password" : "admin"}
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={form.errors.password}
            icon={<Lock size={14} />}
          />
        </Group>
        <Button fullWidth mt="xl" size="md" type="submit">
          {upperFirst(type)}
        </Button>

        <Text align="center" mt="md">
          {type === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <Anchor<"a"> href="#" weight={700} onClick={() => toggleForm()}>
            {upperFirst(type === "login" ? "Register" : "Login")}
          </Anchor>
        </Text>
      </form>
    </Modal>
  );
}

export { Auth };
