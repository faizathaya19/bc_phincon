"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewSchema = exports.productIdSchema = exports.feedbackSchema = exports.getTransactionDetailSchema = exports.checkoutSchema = exports.deleteFromCartSchema = exports.addToCartSchema = exports.refreshTokenSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
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
exports.addToCartSchema = joi_1.default.object({
    product_id: joi_1.default.number().required(),
    quantity: joi_1.default.number().min(1).required(),
});
exports.deleteFromCartSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
});
exports.checkoutSchema = joi_1.default.object({
    cart_ids: joi_1.default.array().items(joi_1.default.number()).required(),
});
exports.getTransactionDetailSchema = joi_1.default.object({
    transaction_id: joi_1.default.number().required(),
});
exports.feedbackSchema = joi_1.default.object({
    product_id: joi_1.default.number().required(),
    comment: joi_1.default.string().required(),
    rating: joi_1.default.number().min(1).max(5).required(),
});
exports.productIdSchema = joi_1.default.object({
    product_id: joi_1.default.number().required().messages({
        'any.required': 'Product ID is required',
        'number.base': 'Product ID must be a number',
    }),
});
exports.reviewSchema = joi_1.default.object({
    type: joi_1.default.string().valid('course', 'app', 'tryout-section').required(),
    content: joi_1.default.string().min(10).required(),
    rating: joi_1.default.number().min(1).max(5).required(),
});
