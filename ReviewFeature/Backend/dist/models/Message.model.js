"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const configData_1 = __importDefault(require("../config/configData"));
class Message extends sequelize_1.Model {
}
Message.init({
    id: {
        type: sequelize_1.DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false,
    },
    roomId: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
        references: { model: 'chat_rooms', key: 'id' },
        onDelete: 'CASCADE',
    },
    userId: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false,
    },
    message: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    active: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
    data: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: configData_1.default.database,
    tableName: 'messages',
    timestamps: true,
    underscored: false,
});
exports.default = Message;
