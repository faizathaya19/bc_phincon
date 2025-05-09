"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feedback_controller_1 = require("../controllers/feedback.controller");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.get('/', feedback_controller_1.getAllFeedback);
router.get('/product/:productId', feedback_controller_1.getFeedbackByProductId);
router.post('/', authMiddleware_1.default, feedback_controller_1.createFeedback);
router.put('/:id', authMiddleware_1.default, feedback_controller_1.updateFeedback);
router.delete('/:id', authMiddleware_1.default, feedback_controller_1.deleteFeedback);
exports.default = router;
