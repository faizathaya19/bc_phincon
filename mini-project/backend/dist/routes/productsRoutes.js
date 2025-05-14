"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productControllert_1 = require("../controllers/productControllert");
const router = express_1.default.Router();
router.get('/all', productControllert_1.products);
router.post('/', productControllert_1.product);
exports.default = router;
