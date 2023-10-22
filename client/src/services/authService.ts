import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { AuthService } from "../types";
import { getUserName } from "./userService";

const registerUser = async (
  values: AuthService
): Promise<UserCredential | null> => {
  try {
    const auth = getAuth();
    const response = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      return Promise.reject(error.message);
    }
    return null;
  }
};

const loginUser = async (
  values: AuthService
): Promise<UserCredential["user"] | null> => {
  try {
    const auth = getAuth();
    const response = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    const user = await getUserName(response);

    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Promise.reject(error.message);
    }
    return null;
  }
};

const logoutUser = async () => {
  try {
    const auth = getAuth();
    return await auth.signOut();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message;
    }
    return null;
  }
};

const deleteUser = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      await user.delete();
    }
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message;
    }
    return null;
  }
};

export { registerUser, loginUser, logoutUser, deleteUser };
