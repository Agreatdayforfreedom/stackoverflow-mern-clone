"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function HttpException(message, statusCode, response) {
    const err = new Error(message);
    response.status(statusCode).json({ err: err.message });
}
exports.default = HttpException;
