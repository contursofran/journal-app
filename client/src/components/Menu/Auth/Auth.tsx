import {
  Anchor,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { upperFirst, useToggle } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { At, Check, Lock, User, X } from "tabler-icons-react";
import { useState } from "react";
import { useStyles } from "./Auth.styles";
import { useAuth } from "../../../hooks/useAuth";

function Auth({ opened, close }: { opened: boolean; close: () => void }) {
  const { classes } = useStyles();

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

  const icons = {
    check: <Check />,
    x: <X />,
  };

  const { login, register } = useAuth(setVisible, close, form, icons);

  const toggleForm = () => {
    form.reset();
    toggle();
  };

  const handleSubmit = () => {
    if (type === "login") {
      login();
      form.reset();
    } else {
      register();
      form.reset();
    }
  };

  return (
    <Modal
      classNames={classes}
      centered
      opened={opened}
      onClose={close}
      closeOnClickOutside={false}
      withCloseButton={false}
      size="sm"
      title={type === "login" ? "Welcome back" : "Register"}
    >
      <LoadingOverlay visible={visible} />
      <form onSubmit={form.onSubmit(() => handleSubmit())}>
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
