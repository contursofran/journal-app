import axios from "axios";
import { getAuth } from "@firebase/auth";
import { apiUrl } from "../common/constants";

const createUser = async (
  values: { email: string; name: string },
  setError: (error: string) => void
) => {
  try {
    const token = await getAuth().currentUser?.getIdToken();

    const response = await axios({
      method: "post",
      url: `${apiUrl}/users`,
      data: {
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

export { createUser };
