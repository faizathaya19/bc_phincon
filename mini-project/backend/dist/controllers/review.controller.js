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
exports.getAllTryoutSections = exports.getAllCourses = exports.createReview = exports.getTryoutSectionById = exports.getAllReviews = exports.getAllTryoutSectionReviews = exports.getAllCourseReviews = exports.getCourseById = void 0;
const users_model_1 = __importDefault(require("../models/users/users.model"));
const review_model_1 = __importDefault(require("../models/review/review.model"));
const Course_model_1 = __importDefault(require("../models/Course.model"));
const tryoutSection_model_1 = __importDefault(require("../models/tryoutSection.model"));
const responseUtil_1 = require("../utils/responseUtil");
const promises_1 = __importDefault(require("fs/promises"));
const cloudinary_1 = require("cloudinary");
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const applyReviewFilters = (req) => {
    const { sortBy, searchUser, searchContent, rating } = req.query;
    const whereClause = {};
    const orderClause = [];
    const userWhereClause = {};
    if (searchContent) {
        whereClause.content = { [sequelize_1.Op.like]: `%${searchContent}%` };
    }
    if (searchUser) {
        userWhereClause.fullname = { [sequelize_1.Op.like]: `%${searchUser}%` };
    }
    if (rating) {
        whereClause.rating = parseInt(rating, 10);
    }
    if (sortBy) {
        switch (sortBy) {
            case 'latest':
                orderClause.push(['createdAt', 'DESC']);
                break;
            case 'oldest':
                orderClause.push(['createdAt', 'ASC']);
                break;
            case 'highest_rating':
                orderClause.push(['rating', 'DESC']);
                break;
            case 'lowest_rating':
                orderClause.push(['rating', 'ASC']);
                break;
            default:
                break;
        }
    }
    return { where: whereClause, order: orderClause, userWhere: userWhereClause };
};
const getCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const filters = applyReviewFilters(req);
    try {
        const course = yield Course_model_1.default.findByPk(courseId);
        if (!course) {
            return (0, responseUtil_1.sendResponse)(res, 404, 'Course not found');
        }
        const reviews = yield review_model_1.default.findAll({
            where: Object.assign({ referenceId: courseId, type: 'course' }, filters.where),
            include: [
                {
                    model: users_model_1.default,
                    as: 'user',
                    attributes: ['id', 'fullname'],
                    where: filters.userWhere,
                },
            ],
            order: filters.order.length > 0 ? filters.order : [['createdAt', 'DESC']],
        });
        return (0, responseUtil_1.sendResponse)(res, 200, 'Course retrieved successfully', Object.assign(Object.assign({}, course.get()), { reviews }));
    }
    catch (error) {
        console.error('Error fetching course by ID:', error);
        return (0, responseUtil_1.sendResponse)(res, 500, 'Error fetching course by ID', error);
    }
});
exports.getCourseById = getCourseById;
const getAllReviewsByType = (req, res, type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = applyReviewFilters(req);
        const whereClause = type ? Object.assign({ type }, filters.where) : filters.where;
        const includeOptions = [
            {
                model: type === 'course'
                    ? Course_model_1.default
                    : type === 'tryout-section'
                        ? tryoutSection_model_1.default
                        : sequelize_typescript_1.Sequelize.literal('NULL'),
                as: type === 'course'
                    ? 'course'
                    : type === 'tryout-section'
                        ? 'tryoutSection'
                        : undefined,
                attributes: ['id', 'code', 'title'],
            },
            {
                model: users_model_1.default,
                as: 'user',
                attributes: ['id', 'fullname'],
                where: filters.userWhere,
            },
        ];
        const reviews = yield review_model_1.default.findAll({
            where: whereClause,
            order: filters.order,
            include: includeOptions.filter((option) => option.model !== sequelize_typescript_1.Sequelize.literal('NULL')),
        });
        return (0, responseUtil_1.sendResponse)(res, 200, `Reviews for ${type || 'all'} retrieved successfully`, reviews);
    }
    catch (error) {
        console.error(`Error fetching reviews for ${type || 'all'}:`, error);
        return (0, responseUtil_1.sendResponse)(res, 500, `Error fetching reviews for ${type || 'all'}`, { error });
    }
});
const getAllCourseReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return getAllReviewsByType(req, res, 'course');
});
exports.getAllCourseReviews = getAllCourseReviews;
const getAllTryoutSectionReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return getAllReviewsByType(req, res, 'tryout-section');
});
exports.getAllTryoutSectionReviews = getAllTryoutSectionReviews;
const getAllReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return getAllReviewsByType(req, res, null);
});
exports.getAllReviews = getAllReviews;
const getTryoutSectionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tryoutSectionId } = req.params;
    const filters = applyReviewFilters(req);
    try {
        const tryoutSection = yield tryoutSection_model_1.default.findByPk(tryoutSectionId);
        if (!tryoutSection) {
            return (0, responseUtil_1.sendResponse)(res, 404, 'Course not found');
        }
        const reviews = yield review_model_1.default.findAll({
            where: Object.assign({ referenceId: tryoutSectionId, type: 'tryout-section' }, filters.where),
            include: [
                {
                    model: users_model_1.default,
                    as: 'user',
                    attributes: ['id', 'fullname'],
                    where: filters.userWhere,
                },
            ],
            order: filters.order.length > 0 ? filters.order : [['createdAt', 'DESC']],
        });
        return (0, responseUtil_1.sendResponse)(res, 200, 'tryout section retrieved successfully', Object.assign(Object.assign({}, tryoutSection.get()), { reviews }));
    }
    catch (error) {
        console.error('Error fetching tryout section by ID:', error);
        return (0, responseUtil_1.sendResponse)(res, 500, 'Error fetching tryout section by ID', error);
    }
});
exports.getTryoutSectionById = getTryoutSectionById;
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let tempFilePath;
    try {
        const { user_id } = req.params;
        const { type, referenceId, content, rating } = req.body;
        const image = req.file;
        let imageUrl = '';
        if (image) {
            tempFilePath = image.path;
            try {
                const uploadResult = yield cloudinary_1.v2.uploader.upload(image.path, {
                    public_id: `reviews/${referenceId}`,
                });
                imageUrl = uploadResult.secure_url;
                yield promises_1.default.unlink(tempFilePath);
            }
            catch (cloudinaryError) {
                if (tempFilePath) {
                    yield promises_1.default.unlink(tempFilePath);
                }
                return (0, responseUtil_1.sendResponse)(res, 500, 'Error uploading image to Cloudinary', cloudinaryError);
            }
        }
        else {
            console.log('Tidak ada file gambar yang diterima (req.file adalah undefined).');
        }
        const review = yield review_model_1.default.create({
            referenceId,
            type,
            rating,
            content,
            image: imageUrl,
            active: false,
            user_id: user_id,
        });
        console.log('Review berhasil dibuat:', review);
        return (0, responseUtil_1.sendResponse)(res, 201, 'Review berhasil dibuat', review);
    }
    catch (error) {
        console.error('Error membuat review:', error);
        if (tempFilePath) {
            try {
                yield promises_1.default.unlink(tempFilePath);
                console.log('File sementara dihapus karena error lain:', tempFilePath);
            }
            catch (unlinkError) {
                console.error('Error menghapus file sementara:', unlinkError);
            }
        }
        return (0, responseUtil_1.sendResponse)(res, 500, 'Error membuat review', error);
    }
});
exports.createReview = createReview;
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield Course_model_1.default.findAll({
            attributes: ['id', 'code', 'title', 'description'],
        });
        return (0, responseUtil_1.sendResponse)(res, 200, 'Courses retrieved successfully', courses);
    }
    catch (err) {
        return (0, responseUtil_1.sendResponse)(res, 500, 'Error fetching courses', { error: err });
    }
});
exports.getAllCourses = getAllCourses;
const getAllTryoutSections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sections = yield tryoutSection_model_1.default.findAll({
            attributes: ['id', 'code', 'title', 'description'],
        });
        return (0, responseUtil_1.sendResponse)(res, 200, 'Tryout sections retrieved successfully', sections);
    }
    catch (err) {
        return (0, responseUtil_1.sendResponse)(res, 500, 'Error fetching tryout sections', {
            error: err,
        });
    }
});
exports.getAllTryoutSections = getAllTryoutSections;
