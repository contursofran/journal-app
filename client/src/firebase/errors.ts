export const handleErrors = (error: unknown, type: "login" | "register") => {
  if (type === "login") {
    switch (error) {
      case "Firebase: Error (auth/wrong-password).":
        return "Email or password is invalid";
      case "Firebase: Error (auth/user-not-found).":
        return "Email or password is invalid";
      case "Firebase: Error (auth/invalid-email).":
        return "Email or password is invalid";
      default:
        return null;
    }
  } else {
    switch (error) {
      case "Firebase: Error (auth/email-already-in-use).":
        return "Email already in use";
      case "Firebase: Error (auth/invalid-email).":
        return "Invalid email";
      default:
        return null;
    }
  }
};
