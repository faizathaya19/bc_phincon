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
const configData_1 = __importDefault(require("./config/configData"));
const cloudinary_1 = require("cloudinary");
const associations_1 = require("./models/associations");
const socket_1 = require("./utils/socket");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield configData_1.default.database.authenticate();
        console.log('✅ Database connected');
        (0, associations_1.setupAssociations)();
        cloudinary_1.v2.config(configData_1.default.cloudinary);
        socket_1.httpServer.listen(configData_1.default.port, () => {
            console.log(`🚀 Server listening on port ${configData_1.default.port}`);
        });
    }
    catch (err) {
        console.error('❌ Unable to connect to the database:', err);
    }
});
startServer();
