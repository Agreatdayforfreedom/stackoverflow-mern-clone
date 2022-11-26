import { Router } from "express";
import { getUserInfo, getUsers } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getUserInfo);

export default userRouter;
