"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const users_model_1 = __importDefault(require("./users/users.model"));
class Rating extends sequelize_1.Model {
}
Rating.init({
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
    rating: {
        type: sequelize_1.DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
}, {
    sequelize: config_1.default.database,
    tableName: 'ratings',
});
Rating.belongsTo(users_model_1.default, { foreignKey: 'user_id', as: 'user' });
exports.default = Rating;
