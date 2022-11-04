import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const genJwt = (_id: string): string => {
  return jwt.sign({ _id }, process.env.JWT_SECRET as string);
};

export default genJwt;
