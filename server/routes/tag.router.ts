import { query, Request, Response, Router } from "express";
import HttpException from "../exceptions/http.exception";
import checkAuth from "../middlewares/checkAuth";
import TagModel from "../models/Tag.model";

const tagRouter = Router();

tagRouter.get(
  "/",
  async (
    request: Request<{}, {}, {}, { skip: string }>,
    response: Response
  ) => {
    try {
      const { skip } = request.query;

      let tags: any = TagModel.find();
      const tagsCount = await tags.clone().countDocuments();

      if (skip) {
        tags = tags.skip(parseInt(skip, 10));
      }

      tags = await tags.limit(50).populate("totalQuestions");

      return response.json({ tagsCount, tags });
    } catch (error) {
      console.log(error);
    }
  }
);

tagRouter.get("/:tag", async (request: Request, response: Response) => {
  try {
    const { tag } = request.params;

    const tagFound = await TagModel.findOne({ name: tag });
    if (!tagFound) return HttpException("There was a problem", 400, response);
    return response.json(tagFound);
  } catch (error) {
    console.log(error);
  }
});

tagRouter.put(
  "/edit/:id",
  checkAuth,
  async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      if (!request.body.infoTag) {
        return HttpException("The information is required", 400, response);
      }

      const tagFound = await TagModel.findOne({ _id: id });
      if (!tagFound) return HttpException("There was a problem", 400, response);

      tagFound.infoTag = request.body.infoTag;

      await tagFound.save();
      return response.send(204);
    } catch (error) {
      console.log(error);
    }
  }
);

export default tagRouter;
