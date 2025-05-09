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
exports.getFeedbackByProductId = exports.createFeedback = exports.getAllFeedback = void 0;
const feedback_model_1 = __importDefault(require("../models/feedback/feedback.model"));
const users_model_1 = __importDefault(require("../models/users/users.model"));
const createFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { product_id, comment, rating, } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    console.log('User ID:', userId);
    console.log('Product ID:', product_id);
    console.log('Comment:', comment);
    console.log('Rating:', rating);
    if (!product_id || !comment || !rating) {
        return res
            .status(400)
            .json({ message: 'Product ID, comment, and rating are required' });
    }
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    try {
        const feedback = yield feedback_model_1.default.create({
            product_id: product_id,
            user_id: userId,
            comment,
            rating,
            content_type: 'app',
        });
        return res.status(201).json({
            message: 'Feedback created successfully',
            feedback,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create feedback' });
    }
});
exports.createFeedback = createFeedback;
const getFeedbackByProductId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        console.log(`Fetching feedback for productId: ${productId}`);
        const parsedProductId = Number(productId);
        if (isNaN(parsedProductId)) {
            console.log(`Invalid productId: ${productId}`);
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        const feedbacks = yield feedback_model_1.default.findAll({
            where: { product_id: parsedProductId },
            include: [{ model: users_model_1.default, as: 'user', attributes: ['firstname'] }],
        });
        console.log(`Found ${feedbacks.length} feedbacks for productId: ${productId}`);
        if (feedbacks.length === 0) {
            console.log('No feedback found for this product');
            return res
                .status(404)
                .json({ message: 'No feedback found for this product' });
        }
        return res.status(200).json(feedbacks);
    }
    catch (error) {
        console.error('Error fetching feedback:', error);
        return res.status(500).json({ message: 'Failed to fetch feedback' });
    }
});
exports.getFeedbackByProductId = getFeedbackByProductId;
const getAllFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feedbacks = yield feedback_model_1.default.findAll({
            include: [
                {
                    model: users_model_1.default, // Menambahkan informasi user
                    attributes: ['firsname'],
                },
            ],
        });
        return res.status(200).json(feedbacks);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch all feedback' });
    }
});
exports.getAllFeedback = getAllFeedback;
