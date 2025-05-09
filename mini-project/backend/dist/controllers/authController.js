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
exports.deleteUser = exports.profile = exports.refreshTokenHandler = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const users_model_1 = __importDefault(require("../models/users/users.model"));
const token_1 = require("../utils/token");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password, phone } = req.body;
    try {
        const userExists = yield users_model_1.default.findOne({ where: { email } });
        if (userExists) {
            res.status(400).json({
                code: 400,
                message: 'User already exists',
                data: null,
            });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield users_model_1.default.create({
            firstname,
            lastname,
            email,
            phone,
            password: hashedPassword,
        });
        const accessToken = (0, token_1.generateAccessToken)(newUser.id.toString());
        const refreshToken = (0, token_1.generateRefreshToken)(newUser.id.toString());
        res.status(201).json({
            code: 201,
            message: 'User registered successfully',
            accessToken,
            refreshToken,
            data: newUser,
        });
        return;
    }
    catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            code: 500,
            message: 'Server error',
            data: null,
        });
        return;
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield users_model_1.default.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({
                code: 400,
                message: 'Invalid credentials',
                data: null,
            });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({
                code: 400,
                message: 'Invalid credentials',
                data: null,
            });
            return;
        }
        const accessToken = (0, token_1.generateAccessToken)(user.id.toString());
        const refreshToken = (0, token_1.generateRefreshToken)(user.id.toString());
        res.status(200).json({
            code: 200,
            message: 'Login successful',
            data: {
                accessToken,
                refreshToken,
                user,
            },
        });
        return;
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            code: 500,
            message: 'Server error',
            data: null,
        });
        return;
    }
});
exports.login = login;
const refreshTokenHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
    if (!refreshToken) {
        res.status(401).json({
            code: 401,
            message: 'Refresh token missing',
            data: null,
        });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, (_a = config_1.default.jwtRefreshSecretKey) !== null && _a !== void 0 ? _a : '');
        const newAccessToken = (0, token_1.generateAccessToken)(decoded.id);
        res.status(200).json({
            code: 200,
            message: 'Access token refreshed',
            data: { accessToken: newAccessToken },
        });
        return;
    }
    catch (error) {
        console.error('Refresh token error:', error);
        res.status(403).json({
            code: 403,
            message: 'Invalid or expired refresh token',
            data: null,
        });
        return;
    }
});
exports.refreshTokenHandler = refreshTokenHandler;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield users_model_1.default.findByPk((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        if (!user) {
            res.status(401).json({
                code: 401,
                message: 'User not authenticated',
                data: null,
            });
            return;
        }
        res.status(200).json({
            code: 200,
            message: 'User profile retrieved successfully',
            data: user,
        });
        return;
    }
    catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({
            code: 500,
            message: 'Internal Server Error',
            data: null,
        });
        return;
    }
});
exports.profile = profile;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield users_model_1.default.findByPk((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        if (!user) {
            res.status(404).json({
                code: 404,
                message: 'User not found',
                data: null,
            });
            return;
        }
        yield user.destroy();
        res.status(200).json({
            code: 200,
            message: 'User deleted successfully',
            data: null,
        });
        return;
    }
    catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({
            code: 500,
            message: 'Server error',
            data: null,
        });
        return;
    }
});
exports.deleteUser = deleteUser;
