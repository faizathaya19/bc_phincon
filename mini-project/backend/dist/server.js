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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const configData_1 = __importDefault(require("./config/configData"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const feedback_routes_1 = __importDefault(require("./routes/feedback.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const associations_1 = require("./models/product/associations");
const review_routes_1 = __importDefault(require("./routes/review.routes"));
const cloudinary_1 = require("cloudinary");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', auth_routes_1.default);
app.use('/api/product', products_routes_1.default);
app.use('/api/feedback', feedback_routes_1.default);
app.use('/api/cart', cart_routes_1.default);
app.use('/api', review_routes_1.default);
app.use((err, req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield configData_1.default.database.authenticate();
        cloudinary_1.v2.config(configData_1.default.cloudinary);
        (0, associations_1.setupAssociations)();
        // config.database.sync({ alter: true })
        app.listen(configData_1.default.port, () => {
            console.log(`Server running on port ${configData_1.default.port}`);
        });
    }
    catch (err) {
        console.error('Unable to connect to the database:', err);
    }
});
startServer();
