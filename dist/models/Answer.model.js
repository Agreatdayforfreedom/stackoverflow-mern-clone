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
const mongoose_1 = __importDefault(require("mongoose"));
const Comment_model_1 = __importDefault(require("./Comment.model"));
const answerSchema = new mongoose_1.default.Schema({
    content: { type: String, required: true, trim: true },
    question: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Question" },
    owner: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    accepted: { type: Boolean, default: false },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
answerSchema.pre("deleteMany", { document: false, query: true }, function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const docs = yield this.model.find(this.getFilter());
        const comments = docs.map((item) => item._id);
        yield Comment_model_1.default.deleteMany({ post: { $in: comments } }).exec();
        next();
    });
});
answerSchema.virtual("votes", {
    ref: "Vote",
    localField: "_id",
    foreignField: "voteTo",
    count: true,
});
exports.default = mongoose_1.default.model("Answer", answerSchema);
