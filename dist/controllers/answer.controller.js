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
exports.deleteAnswer = exports.editAnswer = exports.acceptAnswer = exports.sendAnswer = exports.getRelatedAnswers = exports.getAnswer = exports.getAnswers = void 0;
const http_exception_1 = __importDefault(require("../exceptions/http.exception"));
const Answer_model_1 = __importDefault(require("../models/Answer.model"));
const Comment_model_1 = __importDefault(require("../models/Comment.model"));
const Question_model_1 = __importDefault(require("../models/Question.model"));
const User_model_1 = __importDefault(require("../models/User.model"));
const getAnswers = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let answers = yield Answer_model_1.default.find({
            question: request.params.id,
        }).populate("owner");
        return response.json(answers);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAnswers = getAnswers;
const getAnswer = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answers = yield Answer_model_1.default.findOne({
            _id: request.params.id,
        }).populate("owner");
        return response.json(answers);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAnswer = getAnswer;
const getRelatedAnswers = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit = "2" } = request.query;
        let answers = yield Answer_model_1.default.find({
            owner: request.params.id,
        })
            .populate("question")
            .populate("votes")
            .limit(parseInt(limit, 10) | 0);
        return response.json(answers);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getRelatedAnswers = getRelatedAnswers;
const sendAnswer = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = yield Question_model_1.default.findOne({ _id: request.params.id });
        if (!question)
            return (0, http_exception_1.default)("There was a error", 400, response);
        const answer = new Answer_model_1.default();
        answer.content = request.body.content;
        answer.question = question._id;
        answer.owner = request.user._id;
        const answerCreated = yield answer.save();
        const _answerCreated = yield answerCreated.populate("owner", "-password");
        response.status(201).json(_answerCreated);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendAnswer = sendAnswer;
const acceptAnswer = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const answer = yield Answer_model_1.default.findOne({ _id: id });
        if (!answer)
            return (0, http_exception_1.default)("There was a problem", 400, response);
        const ownerPost = yield User_model_1.default.findOne({ _id: answer.owner });
        const question = yield Question_model_1.default.findOne({ _id: answer.question });
        if (!question || !ownerPost)
            return (0, http_exception_1.default)("There was a problem", 400, response);
        if (!question.Authorized(request.user._id))
            return (0, http_exception_1.default)("Not authorized", 401, response);
        if (answer.accepted === true) {
            answer.accepted = false;
            ownerPost.reputation = ownerPost.reputation -= 15;
        }
        else {
            answer.accepted = true;
            ownerPost.reputation = ownerPost.reputation += 15;
        }
        yield Promise.all([yield answer.save(), yield ownerPost.save()]);
        return response.sendStatus(204);
    }
    catch (error) {
        console.log(error);
    }
});
exports.acceptAnswer = acceptAnswer;
const editAnswer = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield Answer_model_1.default.findOne({ _id: request.params.id }).populate("owner");
    if (!answer)
        return (0, http_exception_1.default)("Answer not found", 404, response);
    if (answer.owner._id.toString() !== request.user._id.toString())
        return (0, http_exception_1.default)("Not authorized", 401, response);
    answer.content = request.body.content || answer.content;
    yield answer.save();
    return response.sendStatus(204);
});
exports.editAnswer = editAnswer;
const deleteAnswer = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield Answer_model_1.default.findOne({ _id: request.params.id }).populate("owner");
    if (!answer)
        return (0, http_exception_1.default)("Answer not found", 404, response);
    if (answer.owner._id.toString() !== request.user._id.toString())
        return (0, http_exception_1.default)("Not authorized", 401, response);
    const [answerDeleted, _] = yield Promise.all([
        yield Answer_model_1.default.deleteOne({ _id: answer._id }),
        yield Comment_model_1.default.deleteMany({ post: answer._id }),
    ]);
    return response.json(answerDeleted);
});
exports.deleteAnswer = deleteAnswer;
