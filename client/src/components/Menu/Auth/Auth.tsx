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
import { upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { At, Lock, User } from "tabler-icons-react";
import { useState } from "react";
import { useStyles } from "./Auth.styles";
import { useAuth } from "../../../hooks/useAuth";
import { AuthService } from "../../../types";
import { handleErrors } from "../../../firebase/errors";

function Auth({ opened, close }: { opened: boolean; close: () => void }) {
  const { classes } = useStyles();

  const [typeForm, setTypeForm] = useState<"login" | "register">("login");
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
  const { login, isLoading, errors, register } = useAuth();

  const handleSubmit = async (values: AuthService) => {
    if (typeForm === "login") {
      const res = await login(values);

      if (res) {
        close();
        form.reset();
      }
    } else if (typeForm === "register") {
      await register(values);
      close();
      form.reset();
    }
  };

  const title = () => {
    switch (typeForm) {
      case "login":
        return "Welcome back!";
      case "register":
        return "Create an account";
      default:
        return "";
    }
  };

  const toggleForm = () => {
    form.reset();
    setTypeForm((type) => (type === "login" ? "register" : "login"));
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
      title={title()}
    >
      <LoadingOverlay visible={isLoading} />(
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Group direction="column" grow>
          {typeForm === "register" && (
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
            error={
              form.errors.email
                ? form.errors.email
                : handleErrors(errors, typeForm)
            }
            icon={<At size={14} />}
          />

          <PasswordInput
            required
            label="Password"
            placeholder={typeForm === "register" ? "Your password" : "admin"}
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password
                ? form.errors.password
                : handleErrors(errors, typeForm)
            }
            icon={<Lock size={14} />}
          />
        </Group>
        <Button fullWidth mt="xl" size="md" type="submit">
          {upperFirst(typeForm)}
        </Button>

        <Text align="center" mt="md">
          {typeForm === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <Anchor<"a"> href="#" weight={700} onClick={() => toggleForm()}>
            {upperFirst(typeForm === "login" ? "Register" : "Login")}
          </Anchor>
        </Text>
      </form>
      )
    </Modal>
  );
}

export { Auth };
