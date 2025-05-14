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
exports.getAllAppReviews = exports.getAllTryoutSectionReviews = exports.getAllCourseReviews = exports.getAllApps = exports.getAllTryoutSections = exports.getAllCourses = exports.getAppById = exports.getTryoutSectionById = exports.getCourseById = exports.createReview = exports.getFilterByIdType = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const review_model_1 = __importDefault(require("../models/review.model"));
const Course_model_1 = __importDefault(require("../models/Course.model"));
const tryoutSection_model_1 = __importDefault(require("../models/tryoutSection.model"));
const responseUtil_1 = require("../utils/responseUtil");
const promises_1 = __importDefault(require("fs/promises"));
const cloudinary_1 = require("cloudinary");
const sequelize_1 = require("sequelize");
const validationSchemas_1 = require("../validation/validationSchemas");
const App_model_1 = __importDefault(require("../models/App.model"));
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
const typeModels = (typeParam) => {
    if (typeParam === 'tryout-sections' || typeParam === 'tryout-section')
        return tryoutSection_model_1.default;
    if (typeParam === 'courses' || typeParam === 'course')
        return Course_model_1.default;
    if (typeParam === 'apps' || typeParam === 'app')
        return App_model_1.default;
    throw new Error('Invalid type');
};
const getTypeById = (type) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { typeIdParam } = req.params;
    let typeModel = Course_model_1.default;
    try {
        typeModel = typeModels(type);
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
        if (!data) {
            return (0, responseUtil_1.sendResponse)(res, 404, `${type} not found`);
        }
        return (0, responseUtil_1.sendResponse)(res, 200, `${type} retrieved successfully`, data);
    }
    catch (err) {
        return (0, responseUtil_1.sendResponse)(res, 400, err.message);
    }
});
const getAllByType = (type) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let typeModel = Course_model_1.default;
    try {
        typeModel = typeModels(type);
        const data = yield typeModel.findAll();
        return (0, responseUtil_1.sendResponse)(res, 200, `${type} retrieved successfully`, data);
    }
    catch (err) {
        return (0, responseUtil_1.sendResponse)(res, 500, `Error fetching ${type}`, {
            error: err,
        });
    }
});
const getAllReviewsByType = (type) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let typeModel = Course_model_1.default;
    try {
        typeModel = typeModels(type);
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
const getFilterByIdType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { typeParam, typeIdParam } = req.params;
    const filters = applyReviewFilters(req, res);
    let typeModel = Course_model_1.default;
    try {
        typeModel = typeModels(typeParam);
        const data = yield typeModel.findOne({
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
exports.getFilterByIdType = getFilterByIdType;
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
exports.getCourseById = getTypeById('course');
exports.getTryoutSectionById = getTypeById('tryout-section');
exports.getAppById = getTypeById('app');
exports.getAllCourses = getAllByType('courses');
exports.getAllTryoutSections = getAllByType('tryout-sections');
exports.getAllApps = getAllByType('apps');
exports.getAllCourseReviews = getAllReviewsByType('course');
exports.getAllTryoutSectionReviews = getAllReviewsByType('tryout-section');
exports.getAllAppReviews = getAllReviewsByType('app');
