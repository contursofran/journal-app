import { admin } from "../../firebase";

const decodeToken = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (decodeValue) {
      req.user = decodeValue;
      return next();
    }
    return res.json({ message: "Un authorize" });
  } catch (e) {
    return res.json({ message: "Internal Error" });
  }
};

export { decodeToken };
