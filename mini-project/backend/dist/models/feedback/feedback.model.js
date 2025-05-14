"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const configData_1 = __importDefault(require("../../config/configData"));
const users_model_1 = __importDefault(require("../users/users.model"));
class Feedback extends sequelize_1.Model {
}
Feedback.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
        references: {
            model: users_model_1.default,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    content_type: {
        type: sequelize_1.DataTypes.ENUM('app', 'course', 'quiz'),
        allowNull: false,
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    comment: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    rating: {
        type: sequelize_1.DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
}, {
    sequelize: configData_1.default.database,
    tableName: 'feedbacks',
});
exports.default = Feedback;
