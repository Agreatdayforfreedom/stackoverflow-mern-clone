"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.editComment = exports.createComment = exports.getComments = void 0;
const http_exception_1 = __importDefault(require("../exceptions/http.exception"));
const Comment_model_1 = __importDefault(require("../models/Comment.model"));
const getComments = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit } = request.query;
        let query = Comment_model_1.default.find({
            post: request.params.id,
        });
        const commentsLength = yield query.clone().countDocuments();
        if (typeof limit === "string") {
            query = yield query
                .sort({ createdAt: "desc" })
                .limit(parseInt(limit, 10))
                .populate("owner", "-password");
        }
        response.json({ query, commentsLength });
    }
    catch (error) {
        return (0, http_exception_1.default)("Internal Server Error", 500, response);
    }
});
exports.getComments = getComments;
const createComment = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = {
            content: request.body.content,
            owner: request.user._id,
            post: request.params.id,
        };
        const commentCreated = yield Comment_model_1.default.create(comment);
        const _commentPopulated = yield commentCreated.populate("owner", "-password");
        response.json(_commentPopulated);
    }
    catch (error) {
        return (0, http_exception_1.default)("Internal Server Error", 500, response);
    }
});
exports.createComment = createComment;
const editComment = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield Comment_model_1.default.findOne({
            _id: request.params.id,
        }).populate("owner", "-password");
        if (!comment)
            return (0, http_exception_1.default)("Comment not found", 404, response);
        if (comment.owner._id.toString() !== request.user._id.toString()) {
            return (0, http_exception_1.default)("Not authorized", 401, response);
        }
        comment.content = request.body.content || comment.content;
        const commentEdited = yield comment.save();
        const _commentPopulated = yield commentEdited.populate("owner", "-password");
        return response.json(_commentPopulated);
    }
    catch (error) {
        return (0, http_exception_1.default)("Internal Server Error", 500, response);
    }
});
exports.editComment = editComment;
const deleteComment = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield Comment_model_1.default.findOne({
            _id: request.params.id,
        }).populate("owner", "-password");
        if (!comment)
            return (0, http_exception_1.default)("Comment not found", 404, response);
        if (comment.owner._id.toString() !== request.user._id.toString()) {
            return (0, http_exception_1.default)("Not authorized", 401, response);
        }
        const deleted = yield Comment_model_1.default.deleteOne({ _id: comment._id }, { returnDocument: "after" });
        if (deleted.deletedCount === 1) {
            return response.json(comment);
        }
    }
    catch (error) {
        return (0, http_exception_1.default)("Internal Server Error", 500, response);
    }
});
exports.deleteComment = deleteComment;
