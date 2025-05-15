"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.deleteUserService = exports.profileService = exports.refreshTokenService = exports.loginService = exports.registerService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const configData_1 = __importDefault(require("../config/configData"));
const Users_model_1 = __importDefault(require("../models/Users.model"));
const token_1 = require("../utils/token");
const responseUtil_1 = require("../utils/responseUtil");
const sequelize_1 = require("sequelize");
const registerService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, username, email, password, phone_number } = req.body;
    try {
        const userExists = yield Users_model_1.default.findOne({ where: { email } });
        if (userExists)
            return (0, responseUtil_1.sendResponse)(res, 400, 'User already exists');
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield Users_model_1.default.create({
            id: crypto_1.default.randomUUID(),
            fullname,
            username,
            email,
            phoneNumber: phone_number,
            password: hashedPassword,
            active: true,
        });
        const accessToken = (0, token_1.generateAccessToken)(newUser.id.toString());
        const refreshToken = (0, token_1.generateRefreshToken)(newUser.id.toString());
        return (0, responseUtil_1.sendResponse)(res, 201, 'User registered successfully', {
            accessToken,
            refreshToken,
        });
    }
    catch (err) {
        console.error('Register error:', err);
        return (0, responseUtil_1.sendResponse)(res, 500, 'Server error');
    }
});
exports.registerService = registerService;
const loginService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield Users_model_1.default.findOne({ where: { email } });
        if (!user)
            return (0, responseUtil_1.sendResponse)(res, 400, 'Invalid credentials');
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return (0, responseUtil_1.sendResponse)(res, 400, 'Invalid credentials');
        const accessToken = (0, token_1.generateAccessToken)(user.id.toString());
        const refreshToken = (0, token_1.generateRefreshToken)(user.id.toString());
        return (0, responseUtil_1.sendResponse)(res, 200, 'Login successful', {
            accessToken,
            refreshToken,
        });
    }
    catch (err) {
        console.error('Login error:', err);
        return (0, responseUtil_1.sendResponse)(res, 500, 'Server error');
    }
});
exports.loginService = loginService;
const refreshTokenService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
    if (!refreshToken)
        return (0, responseUtil_1.sendResponse)(res, 401, 'Refresh token missing');
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, (_a = configData_1.default.jwtRefreshSecretKey) !== null && _a !== void 0 ? _a : '');
        const newAccessToken = (0, token_1.generateAccessToken)(decoded.id);
        return (0, responseUtil_1.sendResponse)(res, 200, 'Access token refreshed', {
            accessToken: newAccessToken,
        });
    }
    catch (err) {
        console.error('Refresh token error:', err);
        return (0, responseUtil_1.sendResponse)(res, 403, 'Invalid or expired refresh token');
    }
});
exports.refreshTokenService = refreshTokenService;
const profileService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Users_model_1.default.findByPk(req.user_data.id, {
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'],
            },
        });
        if (!user)
            return (0, responseUtil_1.sendResponse)(res, 401, 'User not authenticated');
        return (0, responseUtil_1.sendResponse)(res, 200, 'User profile retrieved successfully', user);
    }
    catch (err) {
        console.error('Profile error:', err);
        return (0, responseUtil_1.sendResponse)(res, 500, 'Internal Server Error');
    }
});
exports.profileService = profileService;
const deleteUserService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Users_model_1.default.findByPk(req.user_data.id);
        if (!user)
            return (0, responseUtil_1.sendResponse)(res, 404, 'User not found');
        yield user.destroy();
        return (0, responseUtil_1.sendResponse)(res, 200, 'User deleted successfully');
    }
    catch (err) {
        console.error('Delete user error:', err);
        return (0, responseUtil_1.sendResponse)(res, 500, 'Server error');
    }
});
exports.deleteUserService = deleteUserService;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user_data.id;
    try {
        const users = yield Users_model_1.default.findAll({
            attributes: ['id', 'fullname'],
            where: {
                active: true,
                id: { [sequelize_1.Op.ne]: userId }, // exclude self
            },
        });
        return (0, responseUtil_1.sendResponse)(res, 200, 'Users fetched', users);
    }
    catch (err) {
        console.error('fetch user:', err);
        return (0, responseUtil_1.sendResponse)(res, 500, 'Failed to fetch users');
    }
});
exports.getAllUsers = getAllUsers;
