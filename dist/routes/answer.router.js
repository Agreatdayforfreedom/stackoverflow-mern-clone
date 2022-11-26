"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const answer_controller_1 = require("../controllers/answer.controller");
const checkAuth_1 = __importDefault(require("../middlewares/checkAuth"));
const answerRouter = (0, express_1.Router)();
answerRouter.get("/:id", answer_controller_1.getAnswers);
answerRouter.get("/get/:id", checkAuth_1.default, answer_controller_1.getAnswer);
answerRouter.get("/related/:id", answer_controller_1.getRelatedAnswers);
answerRouter.post("/new/:id", checkAuth_1.default, answer_controller_1.sendAnswer);
answerRouter.put("/edit/:id", checkAuth_1.default, answer_controller_1.editAnswer);
answerRouter.put("/accept/:id", checkAuth_1.default, answer_controller_1.acceptAnswer);
answerRouter.delete("/delete/:id", checkAuth_1.default, answer_controller_1.deleteAnswer);
exports.default = answerRouter;
