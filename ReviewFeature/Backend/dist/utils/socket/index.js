"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = exports.io = void 0;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("../../app"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const chatHandler_1 = __importDefault(require("./chatHandler"));
const httpServer = http_1.default.createServer(app_1.default);
exports.httpServer = httpServer;
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
    },
});
exports.io = io;
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token)
        return next(new Error('Unauthorized'));
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        socket.data.userId = decoded.id;
        next();
    }
    catch (_a) {
        next(new Error('Invalid token'));
    }
});
io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    (0, chatHandler_1.default)(io, socket);
});
