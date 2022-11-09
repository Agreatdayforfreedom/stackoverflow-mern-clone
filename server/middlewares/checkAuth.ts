import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import HttpException from "../exceptions/http.exception";
import { User } from "../interfaces/interfaces";
import UserModel from "../models/User.model";

interface IPayload {
  _id: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

const checkAuth = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let token: string = "";
  const simple: string = request.headers.authorization as string;

  try {
    if (simple && simple.toLowerCase().startsWith("bearer")) {
      token = simple.split(" ")[1];

      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as IPayload;

      request.user = (await UserModel.findById({
        _id: payload._id as string,
      }).select("-password")) as User;

      return next();
    }
  } catch (error) {
    if (error instanceof Error) {
      response.status(500).json({ msg: error.message });
    }
  }

  if (!token) HttpException("There was a mistake", 500, response);
};

export default checkAuth;
