"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIdParamSchema = exports.reviewBodySchema = exports.filterQuerySchema = void 0;
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
