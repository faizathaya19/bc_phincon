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
exports.createReviewService = exports.getFilteredReviewById = exports.getAllReviewsByTypeService = exports.getAllByTypeService = exports.getTypeByIdService = exports.applyReviewFilters = void 0;
const sequelize_1 = require("sequelize");
const Course_model_1 = __importDefault(require("../models/Course.model"));
const tryoutSection_model_1 = __importDefault(require("../models/tryoutSection.model"));
const App_model_1 = __importDefault(require("../models/App.model"));
const review_model_1 = __importDefault(require("../models/review.model"));
const users_model_1 = __importDefault(require("../models/users.model"));
const cloudinary_1 = require("cloudinary");
const promises_1 = __importDefault(require("fs/promises"));
const typeModels = (type) => {
    if (type.includes('tryout'))
        return tryoutSection_model_1.default;
    if (type.includes('course'))
        return Course_model_1.default;
    if (type.includes('app'))
        return App_model_1.default;
    throw new Error('Invalid type');
};
const applyReviewFilters = ({ sortBy, searchUser, searchContent, rating, }) => {
    const whereClause = {};
    const orderClause = [];
    const userWhereClause = {};
    if (searchContent)
        whereClause.content = { [sequelize_1.Op.like]: `%${searchContent}%` };
    if (searchUser)
        userWhereClause.fullname = { [sequelize_1.Op.like]: `%${searchUser}%` };
    if (rating)
        whereClause.rating = parseInt(rating, 10);
    if (sortBy) {
        const sortMap = {
            latest: ['createdAt', 'DESC'],
            oldest: ['createdAt', 'ASC'],
            highest_rating: ['rating', 'DESC'],
            lowest_rating: ['rating', 'ASC'],
        };
        if (sortMap[sortBy])
            orderClause.push(sortMap[sortBy]);
    }
    return { where: whereClause, order: orderClause, userWhere: userWhereClause };
};
exports.applyReviewFilters = applyReviewFilters;
const getTypeByIdService = (type, id) => __awaiter(void 0, void 0, void 0, function* () {
    const typeModel = typeModels(type);
    const data = yield typeModel.findOne({
        where: { id },
        include: [
            {
                model: review_model_1.default,
                as: 'reviews',
                separate: true,
                order: [['createdAt', 'DESC']],
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
    return data;
});
exports.getTypeByIdService = getTypeByIdService;
const getAllByTypeService = (type) => __awaiter(void 0, void 0, void 0, function* () {
    const typeModel = typeModels(type);
    return yield typeModel.findAll();
});
exports.getAllByTypeService = getAllByTypeService;
const getAllReviewsByTypeService = (type) => __awaiter(void 0, void 0, void 0, function* () {
    const typeModel = typeModels(type);
    return yield typeModel.findAll({
        include: [
            {
                model: review_model_1.default,
                as: 'reviews',
                separate: true,
                order: [['createdAt', 'DESC']],
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
});
exports.getAllReviewsByTypeService = getAllReviewsByTypeService;
const getFilteredReviewById = (type, id, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const typeModel = typeModels(type);
    return yield typeModel.findOne({
        where: { id },
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
});
exports.getFilteredReviewById = getFilteredReviewById;
const createReviewService = (user_id, body, file) => __awaiter(void 0, void 0, void 0, function* () {
    let imageUrl = '';
    let tempFilePath;
    if (file) {
        tempFilePath = file.path;
        try {
            const result = yield cloudinary_1.v2.uploader.upload(file.path, {
                public_id: `reviews/${body.referenceId}`,
            });
            imageUrl = result.secure_url;
            yield promises_1.default.unlink(tempFilePath);
        }
        catch (err) {
            console.error('Error during image upload:', err);
            if (tempFilePath)
                yield promises_1.default.unlink(tempFilePath).catch((unlinkErr) => {
                    console.error('Error during temporary file cleanup:', unlinkErr);
                });
            throw new Error('Image upload failed');
        }
    }
    return yield review_model_1.default.create({
        referenceId: body.referenceId,
        type: body.type,
        rating: body.rating,
        content: body.content,
        image: imageUrl,
        active: false,
        user_id,
    });
});
exports.createReviewService = createReviewService;
