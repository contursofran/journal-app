import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import { getNotes } from "../services/notesService";
import { createUser } from "../services/userService";
import { useStore } from "../store";
import { AuthService } from "../types";
import { icons } from "../utils/icons";

function useAuth() {
  const [errors, setErrors] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(false);

  const register = async (values: AuthService) => {
    try {
      setIsLoading(true);
      const response = await registerUser(values);
      const data = await createUser(values);

      const user = data.name;

      useStore.setState({
        activeUser: user,
      });

      setIsLoading(false);

      showNotification({
        title: "Registration completed",
        message: "Your account has been created successfully",
        icon: icons.check,
        color: "green",
      });

      return response;
    } catch (error: unknown) {
      setErrors(error);
      setIsLoading(false);
      return null;
    }
  };

  const login = async (values: AuthService) => {
    try {
      setIsLoading(true);
      const user = await loginUser(values);
      const notes = await getNotes();

      useStore.setState({
        activeUser: user,
        activeNoteId: notes.map((note) =>
          note.createdAt === new Date() ? note._id : null
        )[0],
        notes,
      });

      setIsLoading(false);

      showNotification({
        title: "Login completed",
        message: "Your account has been logged in successfully",
        icon: icons.check,
        color: "green",
      });

      return user;
    } catch (error: unknown) {
      setErrors(error);
      setIsLoading(false);
      return null;
    }
  };

  return { login, isLoading, register, errors };
}

export { useAuth };
