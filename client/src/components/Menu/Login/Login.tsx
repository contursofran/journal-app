import React, { useState } from "react";
import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Modal,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { upperFirst, useToggle } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { At, Lock, User } from "tabler-icons-react";
import { useStore } from "../../../store";
import { useStyles } from "./Login.styles";

function Login({ opened, close }: { opened: boolean; close: () => void }) {
  const { classes } = useStyles();

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

  return (
    <Modal
      classNames={classes}
      centered
      opened={opened}
      onClose={close}
      size="sm"
      title={type === "login" ? "Welcome back" : "Register"}
    >
      <form onSubmit={form.onSubmit(() => {})}>
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
            error={form.errors.email && "Invalid username"}
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

export { Login };
