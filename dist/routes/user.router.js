"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const userRouter = (0, express_1.Router)();
userRouter.get("/", user_controller_1.getUsers);
userRouter.get("/:id", user_controller_1.getUserInfo);
exports.default = userRouter;
