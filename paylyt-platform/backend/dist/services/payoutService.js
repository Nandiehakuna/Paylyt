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
const { payoutToWallet, convertBTCtoFiat } = require('./bitnobService');
// Release payment to freelancer (BTC or fiat)
exports.releasePayment = ({ amount_btc, freelancer_wallet_id, convert, target_currency }) => __awaiter(void 0, void 0, void 0, function* () {
    if (convert && target_currency) {
        // Convert BTC to fiat before payout
        const conversion = yield convertBTCtoFiat(amount_btc, target_currency);
        // You may need to implement payout to fiat wallet or bank here
        return { conversion, payout: 'Conversion complete. Withdraw from Bitnob fiat wallet.' };
    }
    else {
        // Direct BTC payout to freelancer's wallet
        const payout = yield payoutToWallet(amount_btc, freelancer_wallet_id);
        return payout; // { tx_id, ... }
    }
});
