"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("../controllers/review.controller");
const multer_1 = require("../utils/multer");
const asyncHandler_1 = require("../utils/asyncHandler");
const router = express_1.default.Router();
router.post('/reviews/:user_id', multer_1.upload.single('image'), (0, asyncHandler_1.asyncHandler)(review_controller_1.createReview));
router.get('/reviews/:typeParam', (0, asyncHandler_1.asyncHandler)(review_controller_1.getAllReviewsByType));
router.get('/f/:typeParam/:typeIdParam', (0, asyncHandler_1.asyncHandler)(review_controller_1.getFilteredReviewsById));
router.get('/d/:typeParam/:typeIdParam', (0, asyncHandler_1.asyncHandler)(review_controller_1.getById));
router.get('/:typeParam', (0, asyncHandler_1.asyncHandler)(review_controller_1.getAllByType));
exports.default = router;
