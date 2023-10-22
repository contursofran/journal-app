import axios from "axios";
import { apiUrl } from "../utils/constants";
import { AuthService } from "../types";
import { getAuth, UserCredential } from "firebase/auth";

const createUser = async (values: AuthService) => {
  try {
    const token = await getAuth().currentUser?.getIdToken();
    const id = await getAuth().currentUser?.uid;

    const response = await axios({
      method: "post",
      url: `${apiUrl}/users`,
      data: {
        _id: id,
        email: values.email,
        name: values.name,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      const user = getAuth().currentUser;
      if (user) {
        user.delete();
        return Promise.reject(error);
      }
    }
    return null;
  }
};

const getUserName = async (
  data: UserCredential
): Promise<UserCredential["user"] | null> => {
  const token = await data.user.getIdToken();
  try {
    const response = await axios({
      method: "get",
      url: `${apiUrl}/users/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.name;
  } catch (error) {
    if (error instanceof Error) {
      return Promise.reject(error);
    }
    return null;
  }
};

export { createUser, getUserName };
