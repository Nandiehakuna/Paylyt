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
const axios = require('axios');
const BITNOB_API_URL = 'https://api.bitnob.co/api/v1';
const BITNOB_API_KEY = process.env.BITNOB_API_KEY;
function getHeaders() {
    return {
        Authorization: `Bearer ${BITNOB_API_KEY}`,
        'Content-Type': 'application/json'
    };
}
// 1. Create Lightning invoice
exports.createLightningInvoice = (amount_btc, job_id) => __awaiter(void 0, void 0, void 0, function* () {
    const amount_sats = Math.round(amount_btc * 100000000);
    const payload = {
        amount: amount_sats,
        description: `PayLyt Job #${job_id}`
    };
    const res = yield axios.post(`${BITNOB_API_URL}/ln/invoice`, payload, { headers: getHeaders() });
    return res.data.data; // { id, payment_request, ... }
});
// 2. Check invoice status
exports.getInvoiceStatus = (invoice_id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios.get(`${BITNOB_API_URL}/ln/invoice/${invoice_id}`, { headers: getHeaders() });
    return res.data.data; // { status, ... }
});
// 3. Payout to freelancer wallet
exports.payoutToWallet = (amount_btc, recipient_wallet_id) => __awaiter(void 0, void 0, void 0, function* () {
    const amount_sats = Math.round(amount_btc * 100000000);
    const payload = {
        amount: amount_sats,
        recipientWalletId: recipient_wallet_id
    };
    const res = yield axios.post(`${BITNOB_API_URL}/wallet/payout`, payload, { headers: getHeaders() });
    return res.data.data; // { tx_id, ... }
});
// 4. Convert BTC to fiat
exports.convertBTCtoFiat = (amount_btc, target_currency) => __awaiter(void 0, void 0, void 0, function* () {
    const amount_sats = Math.round(amount_btc * 100000000);
    const payload = {
        amount: amount_sats,
        targetCurrency: target_currency
    };
    const res = yield axios.post(`${BITNOB_API_URL}/wallet/convert`, payload, { headers: getHeaders() });
    return res.data.data; // { amount_fiat, rate, ... }
});
// 5. Withdraw to bank/mobile money (example endpoint)
exports.withdrawToBank = (amount_fiat, bank_details) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = Object.assign({ amount: amount_fiat }, bank_details // e.g., { bankAccount, bankCode, ... }
    );
    const res = yield axios.post(`${BITNOB_API_URL}/wallet/withdraw`, payload, { headers: getHeaders() });
    return res.data.data;
});
