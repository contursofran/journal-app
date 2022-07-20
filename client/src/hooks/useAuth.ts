import { useState } from "react";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { showNotification } from "@mantine/notifications";
import { AuthService, loginUser, registerUser } from "../services/authService";
import { getNotes } from "../services/notesService";
import { useStore } from "../store";
import { createUser, getUserName } from "../services/userService";

function useAuth(
  setVisible: (state: boolean) => void,
  close: () => void,
  form: UseFormReturnType<AuthService>,
  icons: { check: JSX.Element; x: JSX.Element }
) {
  const setNotes = useStore((state) => state.setNotes);
  const [formError, setFormError] = useState<string>();

  const login = async () => {
    setVisible(true);
    const { values } = form;

    const res = await loginUser(values, setFormError);
    const username = await getUserName(values.email, setFormError);
    console.log(username);

    if (res) {
      setVisible(false);
      close();
      // const fetchNotes = async () => {
      //   const data = await getNotes(token);

      //   const fixData = data.map((note) => ({
      //     ...note,
      //     date: new Date(new Date(note.date).getTime() + 86400000), // adds 1 day to the date
      //   }));

      //   setNotes(fixData);
      // };

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

  return { login, register };
}

export { useAuth };
