"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.deleteUser = exports.profile = exports.refreshTokenHandler = exports.login = exports.register = void 0;
const authService = __importStar(require("../services/auth.service"));
const responseUtil_1 = require("../utils/responseUtil");
const validationSchemas_1 = require("../validation/validationSchemas");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validationSchemas_1.registerSchema.validate(req.body);
    if (error)
        return (0, responseUtil_1.sendResponse)(res, 400, error.details[0].message);
    yield authService.registerService(req, res);
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validationSchemas_1.loginSchema.validate(req.body);
    if (error)
        return (0, responseUtil_1.sendResponse)(res, 400, error.details[0].message);
    yield authService.loginService(req, res);
});
exports.login = login;
const refreshTokenHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validationSchemas_1.refreshTokenSchema.validate(req.headers);
    if (error)
        return (0, responseUtil_1.sendResponse)(res, 400, 'Invalid refresh token format');
    yield authService.refreshTokenService(req, res);
});
exports.refreshTokenHandler = refreshTokenHandler;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield authService.profileService(req, res);
});
exports.profile = profile;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield authService.deleteUserService(req, res);
});
exports.deleteUser = deleteUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield authService.getAllUsers(req, res);
});
exports.getAllUsers = getAllUsers;
