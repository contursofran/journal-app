import Logging from "../utils/logging";
import { admin } from "../../firebase";

const decodeToken = async (req: any, res: any, next: any) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;

      return next();
    }

    return res.status(401).send("Unauthorized");
  } catch (error) {
    Logging.error(error);
    return res.status(500).send("Internal server error");
  }
};

export { decodeToken };
