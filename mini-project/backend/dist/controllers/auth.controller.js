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
const configData_1 = __importDefault(require("../config/configData"));
const users_model_1 = __importDefault(require("../models/users/users.model"));
const token_1 = require("../utils/token");
const responseUtil_1 = require("../utils/responseUtil");
const validationSchemas_1 = require("../validation/validationSchemas");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validationSchemas_1.registerSchema.validate(req.body);
    if (error) {
        return (0, responseUtil_1.sendResponse)(res, 400, error.details[0].message);
    }
    const { fullname, username, email, password, phone_number } = req.body;
    try {
        const userExists = yield users_model_1.default.findOne({ where: { email } });
        if (userExists) {
            return (0, responseUtil_1.sendResponse)(res, 400, 'User already exists');
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield users_model_1.default.create({
            id: crypto.randomUUID(),
            fullname,
            username,
            email,
            phoneNumber: phone_number,
            password: hashedPassword,
            active: false,
        });
        const accessToken = (0, token_1.generateAccessToken)(newUser.id.toString());
        const refreshToken = (0, token_1.generateRefreshToken)(newUser.id.toString());
        return (0, responseUtil_1.sendResponse)(res, 201, 'User registered successfully', {
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        console.error('Register error:', error);
        return (0, responseUtil_1.sendResponse)(res, 500, 'Server error');
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validationSchemas_1.loginSchema.validate(req.body);
    if (error) {
        return (0, responseUtil_1.sendResponse)(res, 400, error.details[0].message);
    }
    const { email, password } = req.body;
    try {
        const user = yield users_model_1.default.findOne({ where: { email } });
        if (!user) {
            return (0, responseUtil_1.sendResponse)(res, 400, 'Invalid credentials');
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return (0, responseUtil_1.sendResponse)(res, 400, 'Invalid credentials');
        }
        const accessToken = (0, token_1.generateAccessToken)(user.id.toString());
        const refreshToken = (0, token_1.generateRefreshToken)(user.id.toString());
        return (0, responseUtil_1.sendResponse)(res, 200, 'Login successful', {
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        console.error('Login error:', error);
        return (0, responseUtil_1.sendResponse)(res, 500, 'Server error');
    }
});
exports.login = login;
const refreshTokenHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { error } = validationSchemas_1.refreshTokenSchema.validate(req.headers);
    if (error) {
        return (0, responseUtil_1.sendResponse)(res, 400, 'Invalid refresh token format');
    }
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
    if (!refreshToken) {
        return (0, responseUtil_1.sendResponse)(res, 401, 'Refresh token missing');
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, (_a = configData_1.default.jwtRefreshSecretKey) !== null && _a !== void 0 ? _a : '');
        const newAccessToken = (0, token_1.generateAccessToken)(decoded.id);
        return (0, responseUtil_1.sendResponse)(res, 200, 'Access token refreshed', {
            accessToken: newAccessToken,
        });
    }
    catch (error) {
        console.error('Refresh token error:', error);
        return (0, responseUtil_1.sendResponse)(res, 403, 'Invalid or expired refresh token');
    }
});
exports.refreshTokenHandler = refreshTokenHandler;
const profile = (Req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_model_1.default.findByPk(Req.user_data.id, {
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'],
            },
        });
        if (!user) {
            return (0, responseUtil_1.sendResponse)(res, 401, 'User not authenticated');
        }
        return (0, responseUtil_1.sendResponse)(res, 200, 'User profile retrieved successfully', user);
    }
    catch (error) {
        console.error('Profile error:', error);
        return (0, responseUtil_1.sendResponse)(res, 500, 'Internal Server Error');
    }
});
exports.profile = profile;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_model_1.default.findByPk(req.user_data.id);
        if (!user) {
            return (0, responseUtil_1.sendResponse)(res, 404, 'User not found');
        }
        yield user.destroy();
        return (0, responseUtil_1.sendResponse)(res, 200, 'User deleted successfully');
    }
    catch (error) {
        console.error('Delete user error:', error);
        return (0, responseUtil_1.sendResponse)(res, 500, 'Server error');
    }
});
exports.deleteUser = deleteUser;
