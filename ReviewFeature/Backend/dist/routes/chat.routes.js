"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_controller_1 = require("../controllers/chat.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.post('/private', auth_middleware_1.default, chat_controller_1.createPrivateRoom);
router.post('/group', auth_middleware_1.default, chat_controller_1.createGroupRoom);
router.get('/rooms', auth_middleware_1.default, chat_controller_1.getUserChatRooms);
router.get('/:roomId', auth_middleware_1.default, chat_controller_1.getMessages);
exports.default = router;
