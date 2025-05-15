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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = chatHandler;
const chat_service_1 = require("../../services/chat.service");
function chatHandler(io, socket) {
    console.log(`Socket connected: ${socket.id}`);
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);
    });
    socket.on('leaveRoom', (roomId) => {
        socket.leave(roomId);
        console.log(`Socket ${socket.id} left room ${roomId}`);
    });
    socket.on('chatMessage', (data) => __awaiter(this, void 0, void 0, function* () {
        const userId = socket.data.userId;
        if (!userId || !data.roomId || !data.message)
            return;
        try {
            const savedMessage = yield (0, chat_service_1.sendMessage)(data.roomId, userId, data.message);
            io.to(data.roomId).emit('newMessage', savedMessage);
        }
        catch (err) {
            console.error('Error sending message:', err);
            socket.emit('error', 'Failed to send message');
        }
    }));
    socket.on('getMessages', (roomId) => __awaiter(this, void 0, void 0, function* () {
        try {
            const messages = yield (0, chat_service_1.getMessages)(roomId);
            socket.emit('messages', messages);
        }
        catch (err) {
            console.error('Failed to get messages:', err);
            socket.emit('error', 'Failed to load messages');
        }
    }));
    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
}
