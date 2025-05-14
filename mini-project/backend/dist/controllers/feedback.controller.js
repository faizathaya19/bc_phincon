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
exports.deleteFeedback = exports.updateFeedback = exports.getAllFeedback = exports.getFeedbackByProductId = exports.createFeedback = void 0;
const feedback_model_1 = __importDefault(require("../models/feedback/feedback.model"));
const users_model_1 = __importDefault(require("../models/users/users.model"));
const responseUtil_1 = require("../utils/responseUtil");
const validationSchemas_1 = require("../validation/validationSchemas");
const createFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = validationSchemas_1.feedbackSchema.validate(req.body);
    if (error) {
        return (0, responseUtil_1.sendResponse)(res, 400, 'Invalid feedback format');
    }
    const { product_id, comment, rating } = value;
    const userId = req.user_data.id;
    try {
        const feedback = yield feedback_model_1.default.create({
            product_id,
            user_id: userId,
            comment,
            rating,
            content_type: 'app',
        });
        const feedbackWithUser = yield feedback_model_1.default.findOne({
            where: { id: feedback.id },
            include: [{ model: users_model_1.default, as: 'user', attributes: ['fullname'] }],
        });
        return (0, responseUtil_1.sendResponse)(res, 201, 'Feedback created successfully', feedbackWithUser);
    }
    catch (error) {
        console.error(error);
        return (0, responseUtil_1.sendResponse)(res, 500, 'Failed to create feedback');
    }
});
exports.createFeedback = createFeedback;
const getFeedbackByProductId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const parsedProductId = Number(productId);
    if (isNaN(parsedProductId)) {
        return (0, responseUtil_1.sendResponse)(res, 400, 'Invalid product ID');
    }
    try {
        const feedbacks = yield feedback_model_1.default.findAll({
            where: { product_id: parsedProductId },
            include: [{ model: users_model_1.default, as: 'user', attributes: ['firstname'] }],
        });
        if (feedbacks.length === 0) {
            return (0, responseUtil_1.sendResponse)(res, 404, 'No feedback found for this product');
        }
        return (0, responseUtil_1.sendResponse)(res, 200, 'Feedback retrieved successfully', feedbacks);
    }
    catch (error) {
        console.error('Error fetching feedback:', error);
        return (0, responseUtil_1.sendResponse)(res, 500, 'Failed to fetch feedback');
    }
});
exports.getFeedbackByProductId = getFeedbackByProductId;
const getAllFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feedbacks = yield feedback_model_1.default.findAll({
            include: [
                {
                    model: users_model_1.default,
                    as: 'user',
                },
            ],
        });
        return (0, responseUtil_1.sendResponse)(res, 200, 'All feedback retrieved successfully', feedbacks);
    }
    catch (error) {
        console.error(error);
        return (0, responseUtil_1.sendResponse)(res, 500, 'Failed to fetch all feedback');
    }
});
exports.getAllFeedback = getAllFeedback;
const deleteFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user_data.id;
    try {
        const feedback = yield feedback_model_1.default.findByPk(id);
        if (!feedback) {
            return (0, responseUtil_1.sendResponse)(res, 404, 'Feedback not found');
        }
        // Optional: Only allow deleting own feedback unless admin
        if (feedback.user_id !== userId) {
            return (0, responseUtil_1.sendResponse)(res, 403, 'Unauthorized to delete this feedback');
        }
        yield feedback.destroy();
        return (0, responseUtil_1.sendResponse)(res, 200, 'Feedback deleted successfully');
    }
    catch (error) {
        console.error(error);
        return (0, responseUtil_1.sendResponse)(res, 500, 'Failed to delete feedback');
    }
});
exports.deleteFeedback = deleteFeedback;
const updateFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { comment, rating } = req.body;
    const userId = req.user_data.id;
    try {
        const feedback = yield feedback_model_1.default.findByPk(id);
        if (!feedback) {
            return (0, responseUtil_1.sendResponse)(res, 404, 'Feedback not found');
        }
        // Optional: Only allow updating own feedback
        if (feedback.user_id !== userId) {
            return (0, responseUtil_1.sendResponse)(res, 403, 'Unauthorized to update this feedback');
        }
        feedback.comment = comment || feedback.comment;
        feedback.rating = rating || feedback.rating;
        yield feedback.save();
        return (0, responseUtil_1.sendResponse)(res, 200, 'Feedback updated successfully', feedback);
    }
    catch (error) {
        console.error(error);
        return (0, responseUtil_1.sendResponse)(res, 500, 'Failed to update feedback');
    }
});
exports.updateFeedback = updateFeedback;
