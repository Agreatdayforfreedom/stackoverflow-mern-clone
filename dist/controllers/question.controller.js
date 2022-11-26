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
exports.deleteQuestion = exports.updateQuestion = exports.newQuestion = exports.getRelatedQuestions = exports.getQuestionsByTag = exports.getQuestion = exports.getQuestions = void 0;
const http_exception_1 = __importDefault(require("../exceptions/http.exception"));
const Answer_model_1 = __importDefault(require("../models/Answer.model"));
const Comment_model_1 = __importDefault(require("../models/Comment.model"));
const Question_model_1 = __importDefault(require("../models/Question.model"));
const Tag_model_1 = __importDefault(require("../models/Tag.model"));
const getQuestions = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, skip } = request.query;
        let questions = Question_model_1.default.find();
        const questionsCount = yield questions.clone().countDocuments();
        if (skip != "0") {
            questions = questions.skip(parseInt(skip, 10));
        }
        if (limit != "0") {
            questions = questions.limit(parseInt(limit, 10));
        }
        questions = yield questions
            .sort([["createdAt", -1]])
            .populate("votes")
            .populate("answers")
            .populate("tags")
            .populate("answerAccepted");
        response.json({ questionsCount, questions });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getQuestions = getQuestions;
const getQuestion = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = yield Question_model_1.default.findOne({
            _id: request.params.id,
        }).populate("tags");
        return response.json(question);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getQuestion = getQuestion;
const getQuestionsByTag = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const { limit, skip } = request.query;
    try {
        let questions = Question_model_1.default.find({
            tags: { $all: [id] },
        });
        const questionsCount = yield questions.clone().countDocuments();
        if (skip != "0") {
            questions = questions.skip(parseInt(skip, 10));
        }
        if (limit != "0") {
            questions = questions.limit(parseInt(limit, 10));
        }
        questions = yield questions
            .sort([["createdAt", -1]])
            .populate("votes")
            .populate("answers")
            .populate("tags")
            .populate("answerAccepted");
        return response.json({ questionsCount, questions });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getQuestionsByTag = getQuestionsByTag;
const getRelatedQuestions = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit } = request.query;
    try {
        const questions = yield Question_model_1.default.find({
            owner: request.params.id,
        })
            .limit(parseInt(limit, 10) | 0)
            .populate("votes");
        return response.json(questions);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getRelatedQuestions = getRelatedQuestions;
const newQuestion = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = new Question_model_1.default({
            title: request.body.title,
            content: request.body.content,
        });
        const tags = yield mergeTag(request.body.tags);
        question.tags.push(...tags);
        question.owner = request.user._id;
        const questionCreated = yield question.save();
        const questionPopulated = yield questionCreated.populate("owner");
        const _questionPopulated = yield questionPopulated.populate("tags");
        return response.json(_questionPopulated);
    }
    catch (error) {
        console.log(error);
    }
});
exports.newQuestion = newQuestion;
function mergeTag(tags) {
    return __awaiter(this, void 0, void 0, function* () {
        const tagExists = yield Tag_model_1.default.find({
            name: [...tags],
        });
        const tagsExistNames = tagExists.map((t) => t.name);
        let intersection = tags.filter((x) => !tagsExistNames.includes(x));
        let tagsIds = [];
        let newTagIds = [];
        if (tagExists) {
            let tagIds = tagExists.map((t) => t._id.toString());
            tagsIds = tagIds;
        }
        if (intersection.length > 0) {
            newTagIds = yield Promise.all(intersection.map((tag) => __awaiter(this, void 0, void 0, function* () {
                const tags = yield Tag_model_1.default.create({
                    name: tag,
                });
                return tags._id.toString();
            })));
        }
        return tagsIds.concat(newTagIds);
    });
}
const updateQuestion = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, tags } = request.body;
    try {
        const question = yield Question_model_1.default.findOne({ _id: request.params.id });
        if (!question)
            return (0, http_exception_1.default)("Question not found", 404, response);
        question.title = title || question.title;
        question.content = content || question.content;
        const uniqueTags = yield mergeTag(tags);
        const questionTagIds = question.tags.map((x) => x._id.toString());
        const tagToRemove = questionTagIds.filter((x) => uniqueTags.indexOf(x) == -1);
        const newTag = uniqueTags.filter((x) => questionTagIds.indexOf(x) == -1);
        if (tagToRemove.length >= 1) {
            yield Question_model_1.default.updateOne({ _id: question._id }, { $pull: { tags: { $in: [...tagToRemove] } } });
        }
        if (uniqueTags) {
            const updated = yield Question_model_1.default.findByIdAndUpdate(question._id, {
                $set: { title, content },
                $addToSet: { tags: { $each: [...newTag] } },
            }, { returnDocument: "after" })
                .populate("tags")
                .populate("owner");
            console.log(updated);
            response.json(updated);
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateQuestion = updateQuestion;
const deleteQuestion = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = yield Question_model_1.default.findOne({ _id: request.params.id });
        if (!question) {
            return (0, http_exception_1.default)("Question not found", 404, response);
        }
        if (question.Authorized(request.user._id) === false) {
            return (0, http_exception_1.default)("Not authorized", 401, response);
        }
        const answers = yield Answer_model_1.default.find({ question: request.params.id });
        yield Promise.all([
            yield Question_model_1.default.deleteOne({ _id: request.params.id }),
            answers &&
                (yield Answer_model_1.default.deleteMany({ question: request.params.id })),
            yield Comment_model_1.default.deleteMany({ post: request.params.id }),
        ]);
        return response.json({ id: question._id });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteQuestion = deleteQuestion;
