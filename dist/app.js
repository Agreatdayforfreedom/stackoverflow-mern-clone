"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const dotenv_1 = __importDefault(require("dotenv"));
const question_router_1 = __importDefault(require("./routes/question.router"));
const answer_router_1 = __importDefault(require("./routes/answer.router"));
const cors_1 = __importDefault(require("cors"));
const vote_router_1 = __importDefault(require("./routes/vote.router"));
const comment_router_1 = __importDefault(require("./routes/comment.router"));
const tag_router_1 = __importDefault(require("./routes/tag.router"));
const user_router_1 = __importDefault(require("./routes/user.router"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//routes
app.use("/api/auth", auth_router_1.default);
app.use("/api/user", user_router_1.default);
app.use("/api/question", question_router_1.default);
app.use("/api/answer", answer_router_1.default);
app.use("/api/vote", vote_router_1.default);
app.use("/api/comment", comment_router_1.default);
app.use("/api/tags", tag_router_1.default);
exports.default = app;
