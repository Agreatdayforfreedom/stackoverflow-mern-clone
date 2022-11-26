"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = require("../controllers/comment.controller");
const checkAuth_1 = __importDefault(require("../middlewares/checkAuth"));
const commentRouter = (0, express_1.Router)();
commentRouter.get("/:id", comment_controller_1.getComments);
commentRouter.post("/new/:id", checkAuth_1.default, comment_controller_1.createComment);
commentRouter.put("/edit/:id", checkAuth_1.default, comment_controller_1.editComment);
commentRouter.delete("/delete/:id", checkAuth_1.default, comment_controller_1.deleteComment);
exports.default = commentRouter;
