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
exports.getTransactionDetail = exports.getAllTransactions = exports.checkout = exports.deleteFromCart = exports.getCart = exports.addToCart = void 0;
const cart_model_1 = __importDefault(require("../models/transactionAndCart/cart.model"));
const product_model_1 = __importDefault(require("../models/product/product.model"));
const transactions_model_1 = __importDefault(require("../models/transactionAndCart/transactions.model"));
const transactionItem_model_1 = __importDefault(require("../models/transactionAndCart/transactionItem.model"));
const validationSchemas_1 = require("../validation/validationSchemas");
const responseUtil_1 = require("../utils/responseUtil");
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user_data.id;
    if (!userId) {
        return (0, responseUtil_1.sendResponse)(res, 400, 'login first');
    }
    const { error } = validationSchemas_1.addToCartSchema.validate(req.body);
    if (error) {
        return (0, responseUtil_1.sendResponse)(res, 400, 'Validation error', error.details[0].message);
    }
    const { product_id, quantity } = req.body;
    try {
        const existing = yield cart_model_1.default.findOne({
            where: { user_id: userId, product_id },
        });
        if (existing) {
            existing.quantity += quantity;
            yield existing.save();
        }
        else {
            yield cart_model_1.default.create({ user_id: userId, product_id, quantity });
        }
        return (0, responseUtil_1.sendResponse)(res, 200, 'Added to cart', {
            user_id: userId,
            product_id,
            quantity,
        });
    }
    catch (error) {
        console.error('Login error:', error);
        return (0, responseUtil_1.sendResponse)(res, 500, 'Server error');
    }
});
exports.addToCart = addToCart;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user_data.id;
    if (!userId) {
        return (0, responseUtil_1.sendResponse)(res, 400, 'login first');
    }
    try {
        const cart = yield cart_model_1.default.findAll({
            where: { user_id: userId },
            include: [{ model: product_model_1.default }],
        });
        return (0, responseUtil_1.sendResponse)(res, 200, 'Get cart success', cart);
    }
    catch (error) {
        console.error('Login error:', error);
        return (0, responseUtil_1.sendResponse)(res, 500, 'Server error');
    }
});
exports.getCart = getCart;
const deleteFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user_data.id;
    const { id } = req.params;
    if (!userId) {
        return (0, responseUtil_1.sendResponse)(res, 400, 'login first');
    }
    // Validasi params menggunakan Joi
    const { error } = validationSchemas_1.deleteFromCartSchema.validate(req.params);
    if (error) {
        return (0, responseUtil_1.sendResponse)(res, 400, 'Validation error', error.details[0].message);
    }
    try {
        const cartItem = yield cart_model_1.default.findOne({
            where: { id, user_id: userId },
        });
        if (!cartItem) {
            return (0, responseUtil_1.sendResponse)(res, 404, 'Cart item not found');
        }
        yield cartItem.destroy();
        return (0, responseUtil_1.sendResponse)(res, 200, 'Item removed from cart');
    }
    catch (err) {
        return (0, responseUtil_1.sendResponse)(res, 500, 'Failed to delete cart item', { error: err });
    }
});
exports.deleteFromCart = deleteFromCart;
const checkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user_data.id;
    if (!userId) {
        return (0, responseUtil_1.sendResponse)(res, 400, 'Login first');
    }
    const { error } = validationSchemas_1.checkoutSchema.validate(req.body);
    if (error) {
        return (0, responseUtil_1.sendResponse)(res, 400, 'Validation error', error.details[0].message);
    }
    const { cart_ids } = req.body;
    try {
        const cartItems = yield cart_model_1.default.findAll({
            where: {
                id: cart_ids,
                user_id: userId,
            },
            include: [product_model_1.default],
        });
        if (cartItems.length === 0) {
            return (0, responseUtil_1.sendResponse)(res, 400, 'Selected cart items not found');
        }
        let total_price = 0;
        const items = [];
        for (const item of cartItems) {
            const product = item.Product;
            if (!product)
                continue;
            const price = Number(product.price) * item.quantity;
            total_price += price;
            items.push({
                product_id: product.id,
                quantity: item.quantity,
                price: product.price,
            });
        }
        const transaction = yield transactions_model_1.default.create({
            user_id: userId,
            total_price,
            status: 'pending',
        });
        yield Promise.all(items.map((item) => transactionItem_model_1.default.create(Object.assign(Object.assign({}, item), { transaction_id: transaction.id }))));
        yield cart_model_1.default.destroy({
            where: {
                id: cart_ids,
                user_id: userId,
            },
        });
        return (0, responseUtil_1.sendResponse)(res, 201, 'Checkout success', transaction);
    }
    catch (err) {
        return (0, responseUtil_1.sendResponse)(res, 500, 'Checkout failed', { error: err });
    }
});
exports.checkout = checkout;
const getAllTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user_data.id;
    if (!userId) {
        return (0, responseUtil_1.sendResponse)(res, 400, 'Login first');
    }
    try {
        const transactions = yield transactions_model_1.default.findAll({
            where: { user_id: userId },
            order: [['createdAt', 'DESC']],
        });
        return (0, responseUtil_1.sendResponse)(res, 200, 'Transactions fetched successfully', transactions);
    }
    catch (err) {
        return (0, responseUtil_1.sendResponse)(res, 500, 'Failed to fetch transactions', {
            error: err,
        });
    }
});
exports.getAllTransactions = getAllTransactions;
const getTransactionDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user_data.id;
    const { transaction_id } = req.body;
    if (!userId) {
        return (0, responseUtil_1.sendResponse)(res, 400, 'Login first');
    }
    const { error } = validationSchemas_1.getTransactionDetailSchema.validate(req.body);
    if (error) {
        return (0, responseUtil_1.sendResponse)(res, 400, 'Validation error', error.details[0].message);
    }
    try {
        const transaction = yield transactions_model_1.default.findOne({
            where: { id: transaction_id, user_id: userId },
            include: [
                {
                    model: transactionItem_model_1.default,
                    as: 'items',
                    include: [product_model_1.default],
                },
            ],
        });
        if (!transaction) {
            return (0, responseUtil_1.sendResponse)(res, 404, 'Transaction not found');
        }
        return (0, responseUtil_1.sendResponse)(res, 200, 'Transaction detail fetched successfully', transaction);
    }
    catch (err) {
        return (0, responseUtil_1.sendResponse)(res, 500, 'Failed to fetch transaction detail', {
            error: err,
        });
    }
});
exports.getTransactionDetail = getTransactionDetail;
