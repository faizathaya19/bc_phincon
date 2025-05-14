"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, code, message, data = null) => {
    res.status(code).json({
        code,
        message,
        data,
    });
};
exports.sendResponse = sendResponse;
