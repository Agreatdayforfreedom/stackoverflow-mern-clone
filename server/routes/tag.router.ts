import { Router } from "express";
import { editTag, getTag, getTags } from "../controllers/tag.controller";
import checkAuth from "../middlewares/checkAuth";

const tagRouter = Router();

tagRouter.get("/", getTags);

tagRouter.get("/:tag", getTag);

tagRouter.put("/edit/:id", checkAuth, editTag);

export default tagRouter;
