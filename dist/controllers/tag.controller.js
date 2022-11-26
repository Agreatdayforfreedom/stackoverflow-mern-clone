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
exports.editTag = exports.getTag = exports.getTags = void 0;
const http_exception_1 = __importDefault(require("../exceptions/http.exception"));
const Tag_model_1 = __importDefault(require("../models/Tag.model"));
const getTags = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip } = request.query;
        let tags = Tag_model_1.default.find();
        const tagsCount = yield tags.clone().countDocuments();
        if (skip) {
            tags = tags.skip(parseInt(skip, 10));
        }
        tags = yield tags.limit(50).populate("totalQuestions");
        return response.json({ tagsCount, tags });
    }
    catch (error) {
        return (0, http_exception_1.default)("Internal Server Error", 500, response);
    }
});
exports.getTags = getTags;
const getTag = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tag } = request.params;
        const tagFound = yield Tag_model_1.default.findOne({ name: tag });
        if (!tagFound)
            return (0, http_exception_1.default)("There was a problem", 400, response);
        return response.json(tagFound);
    }
    catch (error) {
        return (0, http_exception_1.default)("Internal Server Error", 500, response);
    }
});
exports.getTag = getTag;
const editTag = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        if (!request.body.infoTag) {
            return (0, http_exception_1.default)("The information is required", 400, response);
        }
        const tagFound = yield Tag_model_1.default.findOne({ _id: id });
        if (!tagFound)
            return (0, http_exception_1.default)("There was a problem", 400, response);
        tagFound.infoTag = request.body.infoTag;
        yield tagFound.save();
        return response.send(204);
    }
    catch (error) {
        return (0, http_exception_1.default)("Internal Server Error", 500, response);
    }
});
exports.editTag = editTag;
