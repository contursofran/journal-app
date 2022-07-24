import { useState } from "react";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { showNotification } from "@mantine/notifications";
import {
  AuthService,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authService";
import { getNotes } from "../services/notesService";
import { useStore } from "../store";
import { createUser, getUserName } from "../services/userService";

function useAuth(
  setVisible: (state: boolean) => void,
  close: () => void,
  form: UseFormReturnType<AuthService>,
  icons: { check: JSX.Element; x: JSX.Element }
) {
  const [formError, setFormError] = useState<string>();

  const login = async () => {
    setVisible(true);
    const { values } = form;

    const res = await loginUser(values, setFormError);
    const name = await getUserName(setFormError);
    const notes = await getNotes();

    if (res && name && notes) {
      setVisible(false);
      close();
      useStore.setState({
        activeUser: name,
        activeNoteId: notes.map((note) =>
          note.createdAt === new Date() ? note._id : null
        )[0],
        notes,
      });

      showNotification({
        title: "Login completed",
        message: "Your account has been logged in successfully",
        icon: icons.check,
        color: "green",
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
            title: "Login failed",
            message: "Login failed please try again",
            icon: icons.x,
            color: "red",
          });
          break;
      }
    }
  };

  const logout = () => {
    logoutUser();

    useStore.setState({
      activeUser: "Guest",
      activeNoteId: null,
      notes: [],
    });
    showNotification({
      title: "Logout completed",
      message: "Your account has been logged out successfully",
      icon: icons.check,
      color: "green",
    });
  };

  const register = async () => {
    setVisible(true);
    const { values } = form;

    const res = await registerUser(values, setFormError);

    const resBackend = await createUser(values, setFormError);

    if (res && resBackend) {
      setVisible(false);
      close();

      showNotification({
        title: "Registration completed",
        message: "Your account has been created successfully",
        icon: icons.check,
        color: "green",
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
            title: "Something went wrong!",
            message: "An unknown error has occurred, please try again.",
            icon: icons.x,
            color: "red",
          });
          break;
      }
    }
  };

  return { login, register, logout };
}

export { useAuth };
