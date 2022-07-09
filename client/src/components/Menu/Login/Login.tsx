import React, { useState } from "react";
import { Modal, Text } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useStore } from "../../../store";

function Login() {
  const [type, toggle] = useToggle("login", ["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length < 8 ? "Invalid password" : null),
    },
  });

  return (
    <Modal centered opened={false} onClose={() => {}}>
      <Text size="lg" weight={500}>
        Welcome to Mantine
      </Text>
    </Modal>
  );
}

export { Login };
