"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configData_1 = __importDefault(require("../config/configData"));
function generateAccessToken(userId) {
    return jsonwebtoken_1.default.sign({ id: userId }, configData_1.default.jwtSecretKey, {
        expiresIn: '1d',
    });
}
function generateRefreshToken(userId) {
    return jsonwebtoken_1.default.sign({ id: userId }, configData_1.default.jwtRefreshSecretKey, {
        expiresIn: '7d',
    });
}
