"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feedbackController_1 = require("../controllers/feedbackController"); // Pastikan path benar
const router = express_1.default.Router();
// Rute untuk memberi rating (membutuhkan autentikasi)
// router.post('/rate', authenticate, rateContent)
// // Rute untuk membuat feedback (membutuhkan autentikasi)
// router.post('/feedback', authenticate, createFeedback)
// // Rute untuk mendapatkan feedback
// router.post('/feedback/list', getFeedback)
// // Rute untuk mendapatkan ringkasan feedback (untuk admin, mungkin perlu middleware otorisasi)
// router.post('/feedback/summary', authenticate, getFeedbackSummary)
router.get('/all', feedbackController_1.getAllFeedback);
exports.default = router;
