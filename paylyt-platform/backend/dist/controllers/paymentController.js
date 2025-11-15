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
const { convertBTCtoFiat } = require('../services/bitnobService');
const { releasePayment } = require('../services/payoutService');
// Convert BTC to fiat via Bitnob
exports.convertBTC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount_btc, target_currency } = req.body;
        if (!amount_btc || !target_currency) {
            return res.status(400).json({ error: 'amount_btc and target_currency are required' });
        }
        const result = yield convertBTCtoFiat(amount_btc, target_currency);
        res.json({ message: 'Conversion successful', result });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Withdraw to bank/mobile money (to be implemented)
exports.withdraw = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // This would typically call Bitnob's withdrawal API
    res.json({ message: 'Withdraw endpoint (to be implemented)' });
});
