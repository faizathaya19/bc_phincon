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
exports.handleTransfer = void 0;
const midtransService_1 = require("../services/midtransService");
const users_model_1 = __importDefault(require("../models/users/users.model"));
const handleTransfer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const user = yield users_model_1.default.findByPk((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        if (!user) {
            res.status(401).json({ code: 401, message: 'Unauthorized' });
            return;
        }
        const customerDetails = {
            email: user.email,
            first_name: user.fullname,
            last_name: '',
            phone: (_c = (_b = user.phoneNumber) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : '',
        };
        const { transaction_details, item_details, bank_transfer } = req.body;
        const payload = {
            payment_type: 'bank_transfer',
            transaction_details,
            customer_details: customerDetails,
            item_details,
            bank_transfer,
        };
        const result = yield (0, midtransService_1.transferViaMidtransVA)(payload);
        // const payload: MidtransRequest = req.body
        // const result: MidtransResponse = await transferViaMidtransVA(payload)
        res.status(200).json({
            code: 200,
            message: 'Transaction created successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Midtrans transaction failed',
            data: null,
        });
    }
});
exports.handleTransfer = handleTransfer;
