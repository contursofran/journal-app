import {
  Anchor,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  Modal,
  PasswordInput,
  Popover,
  Text,
  TextInput,
} from "@mantine/core";
import { upperFirst, useToggle } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { At, Lock, User } from "tabler-icons-react";
import { useState } from "react";
import { useStyles } from "./Auth.styles";
import { register } from "../../../services/authService";

function Auth({ opened, close }: { opened: boolean; close: () => void }) {
  const { classes } = useStyles();

  const [formError, setFormError] = useState<string>();
  const [popoverError, setPopoverError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [type, toggle] = useToggle("login", ["login", "register"]);
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length < 8 ? "Invalid password" : null),
      username: (value) => (value.length < 3 ? "Invalid username" : null),
      terms: (value) => (value ? null : "You must accept the terms"),
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
      toggle();
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
          setPopoverError(true);
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
      <Modal
        opened={popoverError}
        onClose={() => setPopoverError(false)}
        size="xs"
        title="Error!"
        classNames={classes}
        centered
      >
        <Group align="center" position="center" direction="column">
          <Text size="md" weight="600">
            Unknown error, try again
          </Text>
          <Button onClick={() => setPopoverError(false)} variant="subtle">
            Accept
          </Button>
        </Group>
      </Modal>
      <LoadingOverlay visible={visible} />
      <form
        onSubmit={form.onSubmit(() =>
          type === "login" ? console.log("Login") : handleRegister()
        )}
      >
        <Group direction="column" grow>
          {type === "register" && (
            <TextInput
              label="Email"
              required
              placeholder="eg. fran@gmail.com"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              icon={<At size={14} />}
              error={form.errors.email}
            />
          )}
          <TextInput
            label="Username"
            required
            placeholder={type === "register" ? "Your username" : "admin"}
            value={form.values.username}
            onChange={(event) =>
              form.setFieldValue("username", event.currentTarget.value)
            }
            error={form.errors.username && "Invalid username"}
            icon={<User size={14} />}
          />

          <PasswordInput
            required
            label="Password"
            placeholder={type === "register" ? "Your password" : "admin"}
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
            icon={<Lock size={14} />}
          />
          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
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
