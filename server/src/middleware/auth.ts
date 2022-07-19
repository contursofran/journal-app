import Logging from "../utils/logging";
import { admin } from "../../firebase";

const decodeToken = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeValue = await await admin.auth().verifyIdToken(token);
    if (decodeValue) {
      return next();
    }

    return res.status(200).json({
      message: "Valid token",
    });
  } catch (e) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export { decodeToken };
