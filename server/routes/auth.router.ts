import { Router } from "express";
import { login, profile, signup } from "../controllers/auth.controller";
import checkAuth from "../middlewares/checkAuth";

const authRouter = Router();

authRouter.post("/login", login);

authRouter.post("/signup", signup);

authRouter.get("/profile", checkAuth, profile);

export default authRouter;
