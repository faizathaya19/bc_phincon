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
exports.getUserChatRooms = exports.getMessages = exports.createGroupRoom = exports.createPrivateRoom = void 0;
const chatService = __importStar(require("../services/chat.service"));
const responseUtil_1 = require("../utils/responseUtil");
const createPrivateRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userIds } = req.body;
    userIds.push((_a = req.user_data) === null || _a === void 0 ? void 0 : _a.id);
    if (!Array.isArray(userIds) || userIds.length !== 2) {
        return (0, responseUtil_1.sendResponse)(res, 400, 'Private chat requires exactly two users');
    }
    try {
        const room = yield chatService.createPrivateRoom(userIds);
        return (0, responseUtil_1.sendResponse)(res, 201, 'Private room ready', room);
    }
    catch (err) {
        console.error(err);
        return (0, responseUtil_1.sendResponse)(res, 500, 'Failed to create private room');
    }
});
exports.createPrivateRoom = createPrivateRoom;
const createGroupRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userIds, sessionId, groupName } = req.body;
    userIds.push((_a = req.user_data) === null || _a === void 0 ? void 0 : _a.id);
    if (!Array.isArray(userIds) || userIds.length < 2) {
        return (0, responseUtil_1.sendResponse)(res, 400, 'Group chat requires at least two users');
    }
    try {
        const room = yield chatService.createGroupRoom(userIds, sessionId, groupName);
        return (0, responseUtil_1.sendResponse)(res, 201, 'Group room created', room);
    }
    catch (err) {
        console.error(err);
        return (0, responseUtil_1.sendResponse)(res, 500, 'Failed to create group room');
    }
});
exports.createGroupRoom = createGroupRoom;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.params;
    try {
        const messages = yield chatService.getMessages(roomId);
        return (0, responseUtil_1.sendResponse)(res, 200, 'Messages loaded', messages);
    }
    catch (err) {
        console.error(err);
        return (0, responseUtil_1.sendResponse)(res, 500, 'Failed to fetch messages');
    }
});
exports.getMessages = getMessages;
const getUserChatRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user_data.id;
    try {
        const rooms = yield chatService.getUserRooms(userId);
        (0, responseUtil_1.sendResponse)(res, 200, 'Rooms fetched', rooms);
    }
    catch (err) {
        console.error(err);
        (0, responseUtil_1.sendResponse)(res, 500, 'Failed to fetch rooms');
    }
});
exports.getUserChatRooms = getUserChatRooms;
