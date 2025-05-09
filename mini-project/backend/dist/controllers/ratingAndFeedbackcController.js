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
exports.getFeedbackSummary = exports.getFeedback = exports.createFeedback = exports.rateContent = void 0;
const rating_model_1 = __importDefault(require("../models/rating.model"));
const feedback_model_1 = __importDefault(require("../models/feedback.model"));
const express_validator_1 = require("express-validator");
const users_model_1 = __importDefault(require("../models/users/users.model"));
// Fungsi Helper untuk menghitung ringkasan (bisa dipindahkan ke file util)
const calculateSummary = (contentType, contentId) => __awaiter(void 0, void 0, void 0, function* () {
    const ratings = yield rating_model_1.default.findAll({
        where: { content_type: contentType, content_id: contentId },
    });
    const feedbackList = yield feedback_model_1.default.findAll({
        where: { content_type: contentType, content_id: contentId },
    });
    const totalRating = ratings.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = ratings.length > 0 ? totalRating / ratings.length : 0;
    return {
        averageRating,
        totalRatings: ratings.length,
        totalFeedback: feedbackList.length,
    };
});
// Controller untuk membuat/memperbarui rating
exports.rateContent = [
    // Validasi input menggunakan express-validator
    (0, express_validator_1.body)('contentType')
        .isIn(['app', 'course', 'quiz'])
        .withMessage('Tipe konten harus app, course, atau quiz'),
    (0, express_validator_1.body)('contentId')
        .isInt({ min: 1 })
        .withMessage('ID konten harus berupa integer positif'),
    (0, express_validator_1.body)('rating')
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating harus antara 1 dan 5'),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        // Periksa hasil validasi
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { contentType, contentId, rating } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Asumsikan user ID tersedia dari middleware autentikasi
        if (!userId) {
            res.status(401).json({ message: 'User tidak terautentikasi' });
            return;
        }
        try {
            // Cek apakah user sudah pernah memberi rating untuk konten ini
            const existingRating = yield rating_model_1.default.findOne({
                where: {
                    user_id: userId,
                    content_type: contentType,
                    content_id: contentId,
                },
            });
            if (existingRating) {
                // Update rating yang sudah ada
                existingRating.rating = rating;
                yield existingRating.save();
                res
                    .status(200)
                    .json({ message: 'Rating berhasil diupdate', rating: existingRating });
            }
            else {
                // Buat rating baru
                const newRating = yield rating_model_1.default.create({
                    user_id: userId,
                    content_type: contentType,
                    content_id: contentId,
                    rating,
                });
                res
                    .status(201)
                    .json({ message: 'Rating berhasil ditambahkan', rating: newRating });
            }
        }
        catch (error) {
            console.error('Error saat memberi rating:', error);
            res
                .status(500)
                .json({ message: 'Gagal memberi rating', error: error.message });
        }
    }),
];
// Controller untuk membuat feedback
exports.createFeedback = [
    // Validasi input menggunakan express-validator
    (0, express_validator_1.body)('contentType')
        .isIn(['app', 'course', 'quiz'])
        .withMessage('Tipe konten harus app, course, atau quiz'),
    (0, express_validator_1.body)('contentId')
        .isInt({ min: 1 })
        .withMessage('ID konten harus berupa integer positif'),
    (0, express_validator_1.body)('comment').notEmpty().withMessage('Komentar tidak boleh kosong'),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        // Periksa hasil validasi
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { contentType, contentId, comment } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Asumsikan user ID tersedia dari middleware autentikasi
        if (!userId) {
            res.status(401).json({ message: 'User tidak terautentikasi' });
            return;
        }
        try {
            const newFeedback = yield feedback_model_1.default.create({
                user_id: userId,
                content_type: contentType,
                content_id: contentId,
                comment,
            });
            res
                .status(201)
                .json({
                message: 'Feedback berhasil ditambahkan',
                feedback: newFeedback,
            });
        }
        catch (error) {
            console.error('Error saat membuat feedback:', error);
            res
                .status(500)
                .json({ message: 'Gagal membuat feedback', error: error.message });
        }
    }),
];
// Controller untuk mendapatkan semua feedback untuk konten tertentu
exports.getFeedback = [
    // Validasi input menggunakan express-validator
    (0, express_validator_1.body)('contentType')
        .isIn(['app', 'course', 'quiz'])
        .withMessage('Tipe konten harus app, course, atau quiz'),
    (0, express_validator_1.body)('contentId')
        .isInt({ min: 1 })
        .withMessage('ID konten harus berupa integer positif'),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { contentType, contentId } = req.body;
        try {
            const feedbackList = yield feedback_model_1.default.findAll({
                where: { content_type: contentType, content_id: contentId },
                include: [
                    { model: users_model_1.default, as: 'user', attributes: ['id', 'firstname'] },
                ],
                order: [['createdAt', 'DESC']], // Order dari yang terbaru
            });
            res.status(200).json(feedbackList);
        }
        catch (error) {
            console.error('Error saat mendapatkan feedback:', error);
            res
                .status(500)
                .json({ message: 'Gagal mendapatkan feedback', error: error.message });
        }
    }),
];
// Controller untuk mendapatkan ringkasan rating dan feedback untuk konten tertentu (untuk admin)
exports.getFeedbackSummary = [
    // Validasi input menggunakan express-validator
    (0, express_validator_1.body)('contentType')
        .isIn(['app', 'course', 'quiz'])
        .withMessage('Tipe konten harus app, course, atau quiz'),
    (0, express_validator_1.body)('contentId')
        .isInt({ min: 1 })
        .withMessage('ID konten harus berupa integer positif'),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { contentType, contentId } = req.body;
        try {
            const summary = yield calculateSummary(contentType, contentId);
            res.status(200).json(summary);
        }
        catch (error) {
            console.error('Error saat mendapatkan ringkasan feedback:', error);
            res
                .status(500)
                .json({
                message: 'Gagal mendapatkan ringkasan feedback',
                error: error.message,
            });
        }
    }),
];
