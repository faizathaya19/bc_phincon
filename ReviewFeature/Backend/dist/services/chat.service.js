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
exports.getMessages = exports.sendMessage = exports.getUserRooms = exports.createGroupRoom = exports.createPrivateRoom = void 0;
const uuid_1 = require("uuid");
const sequelize_1 = require("sequelize");
const chatRoom_model_1 = __importDefault(require("../models/chatRoom.model"));
const usersChatRoom_model_1 = __importDefault(require("../models/usersChatRoom.model"));
const Message_model_1 = __importDefault(require("../models/Message.model"));
const sequelize = chatRoom_model_1.default.sequelize;
const createPrivateRoom = (userIds) => __awaiter(void 0, void 0, void 0, function* () {
    if (userIds.length !== 2) {
        throw new Error('Private chat requires exactly two users');
    }
    // Cek apakah room dengan 2 user ini sudah ada
    const rooms = yield usersChatRoom_model_1.default.findAll({
        where: {
            userId: { [sequelize_1.Op.in]: userIds },
            active: 1,
        },
        attributes: ['roomId'],
        group: ['roomId'],
        having: sequelize.literal('COUNT(DISTINCT userId) = 2'),
    });
    if (rooms.length > 0) {
        const roomId = rooms[0].getDataValue('roomId');
        return chatRoom_model_1.default.findOne({ where: { id: roomId } });
    }
    // Buat room baru
    const room = yield chatRoom_model_1.default.create({
        id: (0, uuid_1.v4)(),
        active: 1,
        data: { isGroup: false },
    });
    const participants = userIds.map((userId) => ({
        id: (0, uuid_1.v4)(),
        roomId: room.id,
        userId,
        active: 1,
    }));
    yield usersChatRoom_model_1.default.bulkCreate(participants);
    return room;
});
exports.createPrivateRoom = createPrivateRoom;
const createGroupRoom = (userIds_1, ...args_1) => __awaiter(void 0, [userIds_1, ...args_1], void 0, function* (userIds, sessionId = null, groupName = null) {
    if (userIds.length < 2) {
        throw new Error('Group chat requires at least two users');
    }
    const room = yield chatRoom_model_1.default.create({
        id: (0, uuid_1.v4)(),
        sessionId,
        active: 1,
        data: { isGroup: true, groupName },
    });
    const participants = userIds.map((userId) => ({
        id: (0, uuid_1.v4)(),
        roomId: room.id,
        userId,
        active: 1,
    }));
    yield usersChatRoom_model_1.default.bulkCreate(participants);
    return room;
});
exports.createGroupRoom = createGroupRoom;
const getUserRooms = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = yield usersChatRoom_model_1.default.findAll({
        where: { userId, active: 1 },
        include: [
            {
                model: chatRoom_model_1.default,
                required: true,
                where: { active: 1 },
            },
        ],
    });
    const grouped = rooms.reduce((acc, entry) => {
        var _a;
        const room = entry.ChatRoom;
        if ((_a = room.data) === null || _a === void 0 ? void 0 : _a.isGroup)
            acc.group.push(room);
        else
            acc.private.push(room);
        return acc;
    }, { group: [], private: [] });
    return grouped;
});
exports.getUserRooms = getUserRooms;
const sendMessage = (roomId, userId, message) => __awaiter(void 0, void 0, void 0, function* () {
    return Message_model_1.default.create({
        id: (0, uuid_1.v4)(),
        roomId,
        userId,
        message,
        active: 1,
    });
});
exports.sendMessage = sendMessage;
const getMessages = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    return Message_model_1.default.findAll({
        where: { roomId, active: 1 },
        order: [['createdAt', 'ASC']],
    });
});
exports.getMessages = getMessages;
