"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/cart.route.ts
const express_1 = require("express");
const cart_controller_1 = require("../controllers/cart.controller");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.post('/add', authMiddleware_1.default, cart_controller_1.addToCart);
router.get('/', authMiddleware_1.default, cart_controller_1.getCart);
router.post('/checkout', authMiddleware_1.default, cart_controller_1.checkout);
router.delete('/:id', authMiddleware_1.default, cart_controller_1.deleteFromCart);
router.get('/transactions', authMiddleware_1.default, cart_controller_1.getAllTransactions);
router.post('/transaction', authMiddleware_1.default, cart_controller_1.getTransactionDetail);
exports.default = router;
