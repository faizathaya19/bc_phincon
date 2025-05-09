"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAssociations = void 0;
const Course_model_1 = __importDefault(require("./Course.model"));
const review_model_1 = __importDefault(require("./review.model"));
const tryoutSection_model_1 = __importDefault(require("./tryoutSection.model"));
const users_model_1 = __importDefault(require("./users.model"));
const setupAssociations = () => {
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
