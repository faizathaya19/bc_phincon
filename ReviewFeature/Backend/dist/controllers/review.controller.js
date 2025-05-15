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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReview = exports.getFilteredReviewsById = exports.getAllReviewsByType = exports.getAllByType = exports.getById = void 0;
const review_service_1 = require("../services/review.service");
const validationSchemas_1 = require("../validation/validationSchemas");
const responseUtil_1 = require("../utils/responseUtil");
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { typeParam, typeIdParam } = req.params;
        const data = yield (0, review_service_1.getTypeByIdService)(typeParam, typeIdParam);
        if (!data)
            return (0, responseUtil_1.sendResponse)(res, 404, `${typeParam} not found`);
        return (0, responseUtil_1.sendResponse)(res, 200, `${typeParam} retrieved successfully`, data);
    }
    catch (err) {
        return (0, responseUtil_1.sendResponse)(res, 400, err.message);
    }
});
exports.getById = getById;
const getAllByType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { typeParam } = req.params;
        const data = yield (0, review_service_1.getAllByTypeService)(typeParam);
        return (0, responseUtil_1.sendResponse)(res, 200, `${typeParam} retrieved successfully`, data);
    }
    catch (err) {
        return (0, responseUtil_1.sendResponse)(res, 500, `Error fetching ${req.params.typeParam}`, err);
    }
});
exports.getAllByType = getAllByType;
const getAllReviewsByType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { typeParam } = req.params;
        const data = yield (0, review_service_1.getAllReviewsByTypeService)(typeParam);
        return (0, responseUtil_1.sendResponse)(res, 200, `reviews ${typeParam} retrieved successfully`, data);
    }
    catch (err) {
        return (0, responseUtil_1.sendResponse)(res, 500, `Error fetching ${req.params.typeParam}`, err);
    }
});
exports.getAllReviewsByType = getAllReviewsByType;
const getFilteredReviewsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = validationSchemas_1.filterQuerySchema.validate(req.query);
        if (error)
            return (0, responseUtil_1.sendResponse)(res, 400, error.message);
        const filters = (0, review_service_1.applyReviewFilters)(value);
        const { typeParam, typeIdParam } = req.params;
        const data = yield (0, review_service_1.getFilteredReviewById)(typeParam, typeIdParam, filters);
        return (0, responseUtil_1.sendResponse)(res, 200, `Filtered reviews retrieved successfully`, data);
    }
    catch (error) {
        return (0, responseUtil_1.sendResponse)(res, 500, 'Error filtering reviews', error);
    }
});
exports.getFilteredReviewsById = getFilteredReviewsById;
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error: paramError } = validationSchemas_1.userIdParamSchema.validate(req.params);
    const { error: bodyError } = validationSchemas_1.reviewBodySchema.validate(req.body);
    if (paramError)
        return (0, responseUtil_1.sendResponse)(res, 400, 'Invalid user_id parameter', paramError.details);
    if (bodyError)
        return (0, responseUtil_1.sendResponse)(res, 400, 'Invalid review body', bodyError.details);
    try {
        const review = yield (0, review_service_1.createReviewService)(req.params.user_id, req.body, req.file);
        return (0, responseUtil_1.sendResponse)(res, 201, 'Review berhasil dibuat', review);
    }
    catch (err) {
        return (0, responseUtil_1.sendResponse)(res, 500, 'Error membuat review', err);
    }
});
exports.createReview = createReview;
