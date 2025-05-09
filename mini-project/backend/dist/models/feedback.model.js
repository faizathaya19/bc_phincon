"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const users_model_1 = __importDefault(require("./users/users.model"));
class Feedback extends sequelize_1.Model {
}
Feedback.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    content_type: {
        type: sequelize_1.DataTypes.ENUM('app', 'course', 'quiz'),
        allowNull: false,
    },
    content_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    comment: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize: config_1.default.database,
    tableName: 'feedbacks',
});
Feedback.belongsTo(users_model_1.default, { foreignKey: 'user_id', as: 'user' });
exports.default = Feedback;
