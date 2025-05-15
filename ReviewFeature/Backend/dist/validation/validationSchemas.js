"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenSchema = exports.loginSchema = exports.registerSchema = exports.userIdParamSchema = exports.reviewBodySchema = exports.filterQuerySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.filterQuerySchema = joi_1.default.object({
    sortBy: joi_1.default.string().valid('latest', 'oldest', 'highest_rating', 'lowest_rating'),
    searchUser: joi_1.default.string().allow(''),
    searchContent: joi_1.default.string().allow(''),
    rating: joi_1.default.number().integer().min(1).max(5),
});
exports.reviewBodySchema = joi_1.default.object({
    type: joi_1.default.string().valid('course', 'tryout-section', 'app').required(),
    referenceId: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
    rating: joi_1.default.number().integer().min(1).max(5).required(),
});
exports.userIdParamSchema = joi_1.default.object({
    user_id: joi_1.default.string().required(),
});
exports.registerSchema = joi_1.default.object({
    fullname: joi_1.default.string().min(3).max(50).required(),
    username: joi_1.default.string().min(3).max(50).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    phone_number: joi_1.default.string().min(10).max(15).optional(),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
});
exports.refreshTokenSchema = joi_1.default.object({
    refreshToken: joi_1.default.string().required(),
});
