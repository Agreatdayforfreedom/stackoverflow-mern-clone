import jwt from "jsonwebtoken";

const genJwt = (_id: string): string => {
  return jwt.sign({ _id }, process.env.JWT_SECRET as string);
};

export default genJwt;
