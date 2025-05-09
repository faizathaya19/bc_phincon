"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const ProductSchema_1 = __importDefault(require("./ProductSchema"));
class Image extends sequelize_1.Model {
}
Image.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    sequelize: config_1.default.database,
    modelName: 'Image',
    tableName: 'images',
    timestamps: false,
});
// Define association
ProductSchema_1.default.hasMany(Image, {
    sourceKey: 'id',
    foreignKey: 'productId',
    as: 'images',
});
Image.belongsTo(ProductSchema_1.default, {
    foreignKey: 'productId',
    as: 'product',
});
exports.default = Image;
