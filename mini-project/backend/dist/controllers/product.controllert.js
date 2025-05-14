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
exports.product = exports.products = void 0;
const product_model_1 = __importDefault(require("../models/product/product.model"));
const productCategory_model_1 = __importDefault(require("../models/product/productCategory.model"));
const productGallery_model_1 = __importDefault(require("../models/product/productGallery.model"));
const responseUtil_1 = require("../utils/responseUtil");
const validationSchemas_1 = require("../validation/validationSchemas");
const products = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.findAll({
            include: [
                { model: productCategory_model_1.default, as: 'category' },
                { model: productGallery_model_1.default, as: 'galleries' },
            ],
        });
        return (0, responseUtil_1.sendResponse)(res, 200, 'Products retrieved successfully', products);
    }
    catch (error) {
        console.error('Error fetching products with relations:', error);
        return (0, responseUtil_1.sendResponse)(res, 500, 'Failed to fetch products with relations');
    }
});
exports.products = products;
const product = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = validationSchemas_1.productIdSchema.validate(req.body);
    if (error) {
        return (0, responseUtil_1.sendResponse)(res, 400, error.details[0].message);
    }
    const { id } = value;
    try {
        const product = yield product_model_1.default.findByPk(id, {
            include: [
                { model: productCategory_model_1.default, as: 'category' },
                { model: productGallery_model_1.default, as: 'galleries' },
            ],
        });
        if (!product) {
            return (0, responseUtil_1.sendResponse)(res, 404, 'Product not found');
        }
        return (0, responseUtil_1.sendResponse)(res, 200, 'Product retrieved successfully', product);
    }
    catch (error) {
        console.error('Error fetching product by ID with relations:', error);
        return (0, responseUtil_1.sendResponse)(res, 500, 'Failed to fetch product with relations');
    }
});
exports.product = product;
