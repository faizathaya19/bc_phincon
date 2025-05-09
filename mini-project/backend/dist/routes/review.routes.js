"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("../controllers/review.controller");
const multer_1 = require("../utils/multer");
const router = express_1.default.Router();
router.get('/reviews', review_controller_1.getAllReviews);
router.get('/reviews/courses', review_controller_1.getAllCourseReviews);
router.get('/reviews/tryout-sections', review_controller_1.getAllTryoutSectionReviews);
router.get('/course/:courseId', review_controller_1.getCourseById);
router.get('/tryout-section/:tryoutSectionId', review_controller_1.getTryoutSectionById);
router.post('/reviews/:user_id', multer_1.upload.single('image'), review_controller_1.createReview);
router.get('/courses', review_controller_1.getAllCourses);
router.get('/tryout-sections', review_controller_1.getAllTryoutSections);
exports.default = router;
