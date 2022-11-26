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
const questionSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    tags: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Tag" }],
    owner: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
});
const cb = function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.populate("owner", "-password");
        next();
    });
};
questionSchema.pre("findOne", cb);
questionSchema.pre("find", cb);
questionSchema.methods.Authorized = function (reqId) {
    if (this.owner._id.toString() === reqId.toString()) {
        return true;
    }
    else {
        return false;
    }
};
questionSchema.virtual("votes", {
    ref: "Vote",
    localField: "_id",
    foreignField: "voteTo",
    count: true,
});
questionSchema.virtual("answers", {
    ref: "Answer",
    localField: "_id",
    foreignField: "question",
    count: true,
});
questionSchema.virtual("answerAccepted", {
    ref: "Answer",
    localField: "_id",
    foreignField: "question",
    match: { accepted: true },
    count: true,
});
exports.default = mongoose_1.default.model("Question", questionSchema);
