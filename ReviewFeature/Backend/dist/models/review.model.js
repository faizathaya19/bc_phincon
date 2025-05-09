"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const configData_1 = __importDefault(require("../config/configData"));
const users_model_1 = __importDefault(require("./users.model"));
class Review extends sequelize_1.Model {
}
Review.init({
    id: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
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
    referenceId: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    rating: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
    },
    data: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
    },
    active: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
    createdAt: '',
    updatedAt: '',
}, {
    sequelize: configData_1.default.database,
    tableName: 'reviews',
    timestamps: true,
});
exports.default = Review;
