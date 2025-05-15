"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAssociations = void 0;
const chatRoom_model_1 = __importDefault(require("./chatRoom.model"));
const Course_model_1 = __importDefault(require("./Course.model"));
const Message_model_1 = __importDefault(require("./Message.model"));
const review_model_1 = __importDefault(require("./review.model"));
const tryoutSection_model_1 = __importDefault(require("./tryoutSection.model"));
const Users_model_1 = __importDefault(require("./Users.model"));
const usersChatRoom_model_1 = __importDefault(require("./usersChatRoom.model"));
const setupAssociations = () => {
    tryoutSection_model_1.default.hasMany(review_model_1.default, { foreignKey: 'referenceId', as: 'reviews' });
    Users_model_1.default.hasMany(review_model_1.default, { foreignKey: 'user_id', as: 'reviews' });
    Course_model_1.default.hasMany(review_model_1.default, { foreignKey: 'referenceId', as: 'reviews' });
    review_model_1.default.belongsTo(Users_model_1.default, {
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
    chatRoom_model_1.default.hasMany(usersChatRoom_model_1.default, { foreignKey: 'roomId' });
    usersChatRoom_model_1.default.belongsTo(chatRoom_model_1.default, { foreignKey: 'roomId' });
    Users_model_1.default.hasMany(usersChatRoom_model_1.default, { foreignKey: 'userId' });
    usersChatRoom_model_1.default.belongsTo(Users_model_1.default, { foreignKey: 'userId' });
    chatRoom_model_1.default.hasMany(Message_model_1.default, { foreignKey: 'roomId' });
    Message_model_1.default.belongsTo(chatRoom_model_1.default, { foreignKey: 'roomId' });
};
exports.setupAssociations = setupAssociations;
