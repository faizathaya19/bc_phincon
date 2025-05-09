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
exports.createReview = exports.getFilterByType = exports.getAllAppReviews = exports.getAllTryoutSectionReviews = exports.getAllCourseReviews = exports.getAllApps = exports.getAllTryoutSections = exports.getAllCourses = exports.getAppById = exports.getTryoutSectionById = exports.getCourseById = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const review_model_1 = __importDefault(require("../models/review.model"));
const Course_model_1 = __importDefault(require("../models/Course.model"));
const tryoutSection_model_1 = __importDefault(require("../models/tryoutSection.model"));
const responseUtil_1 = require("../utils/responseUtil");
const promises_1 = __importDefault(require("fs/promises"));
const cloudinary_1 = require("cloudinary");
const sequelize_1 = require("sequelize");
const validationSchemas_1 = require("../validation/validationSchemas");
const applyReviewFilters = (req, res) => {
    const { error, value } = validationSchemas_1.filterQuerySchema.validate(req.query);
    if (error) {
        throw (0, responseUtil_1.sendResponse)(res, 400, error.message);
    }
    const { sortBy, searchUser, searchContent, rating } = value;
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
    return {
        where: whereClause,
        order: orderClause,
        userWhere: userWhereClause,
    };
};
const typeModels = (res, typeParam) => {
    if (typeParam === 'tryout-sections' || typeParam === 'tryout-section') {
        return tryoutSection_model_1.default;
    }
    else if (typeParam === 'courses' || typeParam === 'course') {
        return Course_model_1.default;
    }
    else {
        throw new Error('Invalid type');
    }
};
const getTypeById = (req, res, type) => __awaiter(void 0, void 0, void 0, function* () {
    const { typeIdParam } = req.params;
    let typeModel = Course_model_1.default;
    try {
        typeModel = typeModels(res, type);
        const data = yield typeModel.findOne({
            where: {
                id: typeIdParam,
            },
            include: [
                {
                    model: review_model_1.default,
                    as: 'reviews',
                    include: [
                        {
                            model: users_model_1.default,
                            as: 'user',
                            attributes: ['id', 'fullname'],
                        },
                    ],
                },
            ],
        });
        if (!data || data.length === 0) {
            return (0, responseUtil_1.sendResponse)(res, 404, `${type} not found`);
        }
        return (0, responseUtil_1.sendResponse)(res, 200, `${type} retrieved successfully`, data);
    }
    catch (err) {
        return (0, responseUtil_1.sendResponse)(res, 400, err.message);
    }
});
const getCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return getTypeById(req, res, 'course');
});
exports.getCourseById = getCourseById;
const getTryoutSectionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return getTypeById(req, res, 'tryout-section');
});
exports.getTryoutSectionById = getTryoutSectionById;
const getAppById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return getTypeById(req, res, 'app');
});
exports.getAppById = getAppById;
const getAllByType = (req, res, type) => __awaiter(void 0, void 0, void 0, function* () {
    let typeModel = Course_model_1.default;
    try {
        typeModel = typeModels(res, type);
        const data = yield typeModel.findAll();
        return (0, responseUtil_1.sendResponse)(res, 200, `${type} retrieved successfully`, data);
    }
    catch (err) {
        return (0, responseUtil_1.sendResponse)(res, 500, `Error fetching ${type}`, {
            error: err,
        });
    }
});
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return getAllByType(req, res, 'courses');
});
exports.getAllCourses = getAllCourses;
const getAllTryoutSections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return getAllByType(req, res, 'tryout-sections');
});
exports.getAllTryoutSections = getAllTryoutSections;
const getAllApps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return getAllByType(req, res, 'apps');
});
exports.getAllApps = getAllApps;
const getAllReviewsByType = (req, res, type) => __awaiter(void 0, void 0, void 0, function* () {
    let typeModel = Course_model_1.default;
    try {
        typeModel = typeModels(res, type);
        const data = yield typeModel.findAll({
            include: [
                {
                    model: review_model_1.default,
                    as: 'reviews',
                    include: [
                        {
                            model: users_model_1.default,
                            as: 'user',
                            attributes: ['id', 'fullname'],
                        },
                    ],
                },
            ],
        });
        if (!data) {
            return (0, responseUtil_1.sendResponse)(res, 404, `reviews ${type} not found`);
        }
        return (0, responseUtil_1.sendResponse)(res, 200, `reviews ${type} retrieved successfully`, data);
    }
    catch (err) {
        return (0, responseUtil_1.sendResponse)(res, 500, `Error fetching ${type}`, {
            error: err,
        });
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
const getAllAppReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return getAllReviewsByType(req, res, 'app');
});
exports.getAllAppReviews = getAllAppReviews;
const getFilterByType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { typeParam, typeIdParam } = req.params;
    const filters = applyReviewFilters(req, res);
    let typeModel = Course_model_1.default;
    try {
        typeModel = typeModels(res, typeParam);
        const data = yield typeModel.findAll({
            where: {
                id: typeIdParam,
            },
            include: [
                {
                    model: review_model_1.default,
                    as: 'reviews',
                    where: filters.where,
                    separate: true,
                    order: filters.order,
                    include: [
                        {
                            model: users_model_1.default,
                            as: 'user',
                            attributes: ['id', 'fullname'],
                            where: filters.userWhere,
                        },
                    ],
                },
            ],
        });
        return (0, responseUtil_1.sendResponse)(res, 200, `filtering ${typeParam} retrieved successfully`, data);
    }
    catch (error) {
        return (0, responseUtil_1.sendResponse)(res, 500, `Error filtering ${typeParam}`, error);
    }
});
exports.getFilterByType = getFilterByType;
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error: paramError } = validationSchemas_1.userIdParamSchema.validate(req.params);
    const { error: bodyError } = validationSchemas_1.reviewBodySchema.validate(req.body);
    if (paramError) {
        return (0, responseUtil_1.sendResponse)(res, 400, 'Invalid user_id parameter', paramError.details);
    }
    if (bodyError) {
        return (0, responseUtil_1.sendResponse)(res, 400, 'Invalid review body', bodyError.details);
    }
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
                    try {
                        yield promises_1.default.unlink(tempFilePath);
                    }
                    catch (unlinkError) {
                        console.error('Failed to delete temp file:', unlinkError);
                    }
                }
                console.error('Cloudinary upload error:', cloudinaryError);
                return (0, responseUtil_1.sendResponse)(res, 500, 'Image upload failed');
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
