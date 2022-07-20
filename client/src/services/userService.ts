import axios from "axios";
import { getAuth } from "@firebase/auth";
import { apiUrl } from "../common/constants";

export interface UserService {
  email: string;
  name: string;
}

const createUser = async (
  values: UserService,
  setError: (error: string) => void
) => {
  try {
    const token = await getAuth().currentUser?.getIdToken();
    const id = await getAuth().currentUser?.uid;

    const response = await axios({
      method: "post",
      url: `${apiUrl}/users`,
      data: {
        id,
        email: values.email,
        name: values.name,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    const user = getAuth().currentUser;
    if (user) {
      user.delete();
    }
    if (error instanceof Error) {
      setError(error.message);
      return null;
    }
    return null;
  }
};

const getUserName = async (
  email: UserService["email"],
  setError: (error: string) => void
) => {
  try {
    const token = await getAuth().currentUser?.getIdToken();

    const response = await axios({
      method: "get",
      url: `${apiUrl}/users/${email}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
      return null;
    }
    return null;
  }
};

export { createUser, getUserName };
