"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const configData_1 = __importDefault(require("../config/configData"));
class TryoutSection extends sequelize_1.Model {
}
TryoutSection.init({
    id: {
        type: sequelize_1.DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    code: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    order: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    data: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    tag: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    active: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    sequelize: configData_1.default.database,
    tableName: 'tryout_sections',
    timestamps: true,
});
exports.default = TryoutSection;
