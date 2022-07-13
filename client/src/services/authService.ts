import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";

interface AuthService {
  email: string;
  password: string;
  username: string;
}

const register = async (
  values: AuthService,
  setError: (error: string) => void
) => {
  try {
    const auth = getAuth();
    const response = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    return response.user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      setError(new Error("test").message);
      return null;
    }
    return null;
  }
};

export { register };
