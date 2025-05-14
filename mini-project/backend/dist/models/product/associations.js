"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAssociations = void 0;
const feedback_model_1 = __importDefault(require("../feedback/feedback.model"));
const cart_model_1 = __importDefault(require("../transactionAndCart/cart.model"));
const product_model_1 = __importDefault(require("./product.model"));
const productCategory_model_1 = __importDefault(require("./productCategory.model"));
const productGallery_model_1 = __importDefault(require("./productGallery.model"));
const transactionItem_model_1 = __importDefault(require("../transactionAndCart/transactionItem.model"));
const transactions_model_1 = __importDefault(require("../transactionAndCart/transactions.model"));
const users_model_1 = __importDefault(require("../users/users.model"));
const Course_model_1 = __importDefault(require("../Course.model"));
const review_model_1 = __importDefault(require("../review/review.model"));
const tryoutSection_model_1 = __importDefault(require("../tryoutSection.model"));
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
    feedback_model_1.default.belongsTo(product_model_1.default, { foreignKey: 'product_id', as: 'product' });
    product_model_1.default.hasMany(cart_model_1.default, { foreignKey: 'product_id' });
    product_model_1.default.hasMany(transactionItem_model_1.default, { foreignKey: 'product_id' });
    cart_model_1.default.belongsTo(product_model_1.default, { foreignKey: 'product_id' });
    transactions_model_1.default.hasMany(transactionItem_model_1.default, {
        foreignKey: 'transaction_id',
        as: 'items',
    });
    transactionItem_model_1.default.belongsTo(transactions_model_1.default, { foreignKey: 'transaction_id' });
    transactionItem_model_1.default.belongsTo(product_model_1.default, { foreignKey: 'product_id' });
    users_model_1.default.hasMany(feedback_model_1.default, { foreignKey: 'user_id', as: 'feedbacks' });
    feedback_model_1.default.belongsTo(users_model_1.default, { foreignKey: 'user_id', as: 'user' });
    tryoutSection_model_1.default.hasMany(review_model_1.default, { foreignKey: 'referenceId', as: 'reviews' });
    users_model_1.default.hasMany(review_model_1.default, { foreignKey: 'user_id', as: 'reviews' });
    Course_model_1.default.hasMany(review_model_1.default, { foreignKey: 'referenceId', as: 'reviews' });
    review_model_1.default.belongsTo(users_model_1.default, {
        foreignKey: 'user_id',
        as: 'user',
    });
    review_model_1.default.belongsTo(Course_model_1.default, {
        foreignKey: 'referenceId',
        constraints: false,
        as: 'course',
    });
    review_model_1.default.belongsTo(tryoutSection_model_1.default, {
        foreignKey: 'referenceId',
        constraints: false,
        as: 'tryoutSection',
    });
};
exports.setupAssociations = setupAssociations;
