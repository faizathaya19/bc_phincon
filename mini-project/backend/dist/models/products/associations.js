"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAssociations = void 0;
const feedback_model_1 = __importDefault(require("../feedback/feedback.model"));
const product_model_1 = __importDefault(require("./product.model"));
const productCategory_model_1 = __importDefault(require("./productCategory.model"));
const productGallery_model_1 = __importDefault(require("./productGallery.model"));
const setupAssociations = () => {
    product_model_1.default.belongsTo(productCategory_model_1.default, {
        foreignKey: 'categories_id',
        as: 'category',
    });
    product_model_1.default.hasMany(productGallery_model_1.default, {
        foreignKey: 'products_id',
        as: 'galleries',
    });
    productCategory_model_1.default.hasMany(product_model_1.default, {
        foreignKey: 'categories_id',
        as: 'products',
    });
    productGallery_model_1.default.belongsTo(product_model_1.default, {
        foreignKey: 'products_id',
        as: 'product',
    });
    product_model_1.default.hasMany(feedback_model_1.default, { foreignKey: 'product_id', as: 'feedbacks' });
};
exports.setupAssociations = setupAssociations;
