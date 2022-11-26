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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.signup = exports.login = void 0;
const http_exception_1 = __importDefault(require("../exceptions/http.exception"));
const User_model_1 = __importDefault(require("../models/User.model"));
const genJwt_1 = __importDefault(require("../utils/genJwt"));
const login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { findBy, password } = request.body;
    try {
        if (!findBy || !password)
            return (0, http_exception_1.default)("complete the fields", 400, response);
        // find by any the user chooses: username or email;
        const [user] = yield User_model_1.default.find({
            $or: [{ username: findBy }, { email: findBy }],
        }).exec();
        if (!user) {
            return (0, http_exception_1.default)("Incorrect email/username or password", 400, response);
        }
        if (!(yield user.comparePassword(password)))
            return (0, http_exception_1.default)("Incorrect email/username or password", 400, response);
        const _a = user.toObject(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]);
        return response.json({
            user: userWithoutPassword,
            access_token: (0, genJwt_1.default)(user._id.toString()),
        });
    }
    catch (error) {
        return (0, http_exception_1.default)("Internal Server Error", 500, response);
    }
});
exports.login = login;
const signup = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = request.body;
    try {
        if (!username || !password || !email)
            return (0, http_exception_1.default)("all fields are required", 400, response);
        const [userExists] = yield User_model_1.default.find({
            $or: [{ username }, { email }],
        }).exec();
        if (userExists)
            return (0, http_exception_1.default)("Username or email already exists", 400, response);
        const user = yield User_model_1.default.create({
            username,
            email,
            password,
        });
        const _b = user.toObject(), { password: _ } = _b, userWithoutPassword = __rest(_b, ["password"]);
        return response.status(201).json({
            user: userWithoutPassword,
            access_token: (0, genJwt_1.default)(user._id.toString()),
        });
    }
    catch (error) {
        return (0, http_exception_1.default)("Internal Server Error", 500, response);
    }
});
exports.signup = signup;
const profile = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return response.json(request.user);
    }
    catch (error) {
        return (0, http_exception_1.default)("Internal Server Error", 500, response);
    }
});
exports.profile = profile;
