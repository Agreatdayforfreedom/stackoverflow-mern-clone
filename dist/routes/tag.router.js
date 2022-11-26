"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tag_controller_1 = require("../controllers/tag.controller");
const checkAuth_1 = __importDefault(require("../middlewares/checkAuth"));
const tagRouter = (0, express_1.Router)();
tagRouter.get("/", tag_controller_1.getTags);
tagRouter.get("/:tag", tag_controller_1.getTag);
tagRouter.put("/edit/:id", checkAuth_1.default, tag_controller_1.editTag);
exports.default = tagRouter;
