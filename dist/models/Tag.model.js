"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tagSchema = new mongoose_1.default.Schema({
    name: { type: String, trim: true, require: true, unique: true },
    infoTag: { type: String, trim: true, default: "No information" },
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
tagSchema.virtual("totalQuestions", {
    ref: "Question",
    localField: "_id",
    foreignField: "tags",
    count: true,
    match: (tags) => ({ tags }),
});
exports.default = mongoose_1.default.model("Tag", tagSchema);
