import { Request, Response, Router } from "express";
import HttpException from "../exceptions/http.exception";
import { User } from "../interfaces/interfaces";
import checkAuth from "../middlewares/checkAuth";
import UserModel from "../models/User.model";
import genJwt from "../utils/genJwt";

const authRouter = Router();

authRouter.post("/login", async (request: Request, response: Response) => {
  const { findBy, password } = request.body;

  try {
    if (!findBy || !password)
      return HttpException("complete the fields", 400, response);

    // find by any the user chooses: username or email;
    const [user] = await UserModel.find({ findBy }).exec();
    if (!(await user.comparePassword(password)))
      return HttpException(
        "Incorrect email/username or password",
        401,
        response
      );

    const { password: _, ...userWithoutPassword } = user.toObject();
    return response.json({
      user: userWithoutPassword,
      access_token: genJwt(user._id.toString()),
    });
  } catch (error) {
    console.log(error);
  }
});

authRouter.post("/signup", async (request: Request, response: Response) => {
  const { username, email, password } = request.body;

  try {
    if (!username || !password || !email)
      return HttpException("all fields are required", 400, response);

    const [userNameExists] = await UserModel.find({ username }).exec();
    const [emailExists] = await UserModel.find({ email }).exec();

    if (userNameExists || emailExists)
      return HttpException("Username or email already exists", 400, response);

    const user = await UserModel.create({
      username,
      email,
      password,
    });

    const { password: _, ...userWithoutPassword } = user.toObject();

    return response.status(201).json({
      user: userWithoutPassword,
      access_token: genJwt(user._id.toString()),
    });
  } catch (error) {
    console.log(error);
  }
});

authRouter.get(
  "/profile",
  checkAuth,
  async (request: Request, response: Response) => {
    return response.json(request.user);
  }
);

export default authRouter;
