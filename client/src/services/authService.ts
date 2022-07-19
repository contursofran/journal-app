import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import axios from "axios";
import { apiUrl } from "../common/constants";

export interface AuthService {
  email: string;
  password: string;
  name: string;
}

const registerUser = async (
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
      setError(error.message);
      return null;
    }
    return null;
  }
};

const loginUser = async (
  values: AuthService,
  setError: (error: string) => void
) => {
  try {
    const auth = getAuth();
    const response = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    return response.user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      setError(error.message);
      return null;
    }
    return null;
  }
};

export { registerUser, loginUser };
