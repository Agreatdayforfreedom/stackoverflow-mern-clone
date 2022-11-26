"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const question_controller_1 = require("../controllers/question.controller");
const checkAuth_1 = __importDefault(require("../middlewares/checkAuth"));
const questionRouter = (0, express_1.Router)();
questionRouter.get("/", question_controller_1.getQuestions);
questionRouter.get("/top", question_controller_1.getQuestions);
questionRouter.get("/:id", question_controller_1.getQuestion);
questionRouter.get("/tag/:id", question_controller_1.getQuestionsByTag);
questionRouter.get("/related/:id", question_controller_1.getRelatedQuestions);
questionRouter.post("/new", checkAuth_1.default, question_controller_1.newQuestion);
questionRouter.put("/update/:id", checkAuth_1.default, question_controller_1.updateQuestion);
questionRouter.delete("/delete/:id", checkAuth_1.default, question_controller_1.deleteQuestion);
exports.default = questionRouter;
