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
exports.getUserInfo = exports.getUsers = void 0;
const http_exception_1 = __importDefault(require("../exceptions/http.exception"));
const User_model_1 = __importDefault(require("../models/User.model"));
const getUsers = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, skip } = request.query;
        let users = User_model_1.default.find();
        const usersCount = yield users.clone().countDocuments();
        if (skip != "0") {
            users = users.skip(parseInt(skip, 10));
        }
        if (limit != "0")
            users = users.limit(parseInt(limit, 10));
        users = yield users.select("-password");
        return response.json({ usersCount, users });
    }
    catch (error) {
        return (0, http_exception_1.default)("Internal Server Error", 500, response);
    }
});
exports.getUsers = getUsers;
const getUserInfo = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        let users = yield User_model_1.default.findOne({ _id: id });
        return response.json(users);
    }
    catch (error) {
        return (0, http_exception_1.default)("Internal Server Error", 500, response);
    }
});
exports.getUserInfo = getUserInfo;
