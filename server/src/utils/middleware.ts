import { admin } from "../../firebase";

const decodeToken = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization;
  console.log(token);

  next();
};

export { decodeToken };
