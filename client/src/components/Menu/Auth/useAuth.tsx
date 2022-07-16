import { useState } from "react";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { Check, X } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";
import { loginUser, registerUser } from "../../../services/authService";
import { getNotes } from "../../../services/notesService";
import { AuthService } from "../../../types";
import { useStore } from "../../../store";

function useAuth(
  setVisible: (state: boolean) => void,
  close: () => void,
  form: UseFormReturnType<AuthService>
) {
  const setNotes = useStore((state) => state.setNotes);
  const [formError, setFormError] = useState<string>();

  const login = async () => {
    setVisible(true);
    const { values } = form;

    const res = await loginUser(values, setFormError);

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
        title: "Login completed",
        message: "Your account has been logged in successfully",
        icon: <Check />,
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
            icon: <X />,
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

    if (res) {
      setVisible(false);
      close();

      showNotification({
        title: "Registration completed",
        message: "Your account has been created successfully",
        icon: <Check />,
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
            icon: <X />,
            color: "red",
          });
          break;
      }
    }
  };

  return { login, register };
}

export { useAuth };
