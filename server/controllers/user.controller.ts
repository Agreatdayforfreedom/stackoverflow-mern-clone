import { Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
import UserModel from "../models/User.model";

export const getUsers = async (
  request: Request<{}, {}, {}, { limit: string; skip: string }>,
  response: Response
) => {
  try {
    const { limit, skip } = request.query;

    let users: any = UserModel.find();

    const usersCount = await users.clone().countDocuments();

    if (skip != "0") {
      users = users.skip(parseInt(skip, 10));
    }
    if (limit != "0") users = users.limit(parseInt(limit, 10));

    users = await users.select("-password");

    return response.json({ usersCount, users });
  } catch (error) {
    return HttpException("Internal Server Error", 500, response);
  }
};

export const getUserInfo = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    let users = await UserModel.findOne({ _id: id });
    return response.json(users);
  } catch (error) {
    return HttpException("Internal Server Error", 500, response);
  }
};
