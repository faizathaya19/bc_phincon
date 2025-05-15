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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configData_1 = __importDefault(require("../config/configData"));
const responseUtil_1 = require("../utils/responseUtil");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return (0, responseUtil_1.sendResponse)(res, 401, 'Authorization header is missing');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return (0, responseUtil_1.sendResponse)(res, 401, 'Token is missing');
        }
        if (!configData_1.default.jwtSecretKey) {
            throw new Error('JWT Secret Key is not configured');
        }
        const decoded = jsonwebtoken_1.default.verify(token, configData_1.default.jwtSecretKey);
        req.user_data = decoded;
        return next();
    }
    catch (err) {
        console.error('Error verifying token:', err);
        return (0, responseUtil_1.sendResponse)(res, 403, 'Invalid or expired token', {
            error: err,
        });
    }
});
exports.default = authMiddleware;
