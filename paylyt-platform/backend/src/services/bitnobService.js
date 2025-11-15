
const axios = require('axios');
const BITNOB_API_URL = 'https://api.sandbox.bitnob.co/v1';
const BITNOB_API_KEY = process.env.BITNOB_API_KEY;

function getHeaders() {
  return {
    Authorization: `Bearer ${BITNOB_API_KEY}`,
    'Content-Type': 'application/json'
  };
}

// 1. Create Lightning invoice
exports.createLightningInvoice = async (amount_btc, job_id) => {
  const amount_sats = Math.round(amount_btc * 100_000_000);
  const payload = {
    amount: amount_sats,
    description: `PayLyt Job #${job_id}`
  };
  const res = await axios.post(
    `${BITNOB_API_URL}/ln/invoice`,
    payload,
    { headers: getHeaders() }
  );
  return res.data.data; // { id, payment_request, ... }
};

// 2. Check invoice status
exports.getInvoiceStatus = async (invoice_id) => {
  const res = await axios.get(
    `${BITNOB_API_URL}/ln/invoice/${invoice_id}`,
    { headers: getHeaders() }
  );
  return res.data.data; // { status, ... }
};

// 3. Payout to freelancer wallet
exports.payoutToWallet = async (amount_btc, recipient_wallet_id) => {
  const amount_sats = Math.round(amount_btc * 100_000_000);
  const payload = {
    amount: amount_sats,
    recipientWalletId: recipient_wallet_id
  };
  const res = await axios.post(
    `${BITNOB_API_URL}/wallet/payout`,
    payload,
    { headers: getHeaders() }
  );
  return res.data.data; // { tx_id, ... }
};

// 4. Convert BTC to fiat
exports.convertBTCtoFiat = async (amount_btc, target_currency) => {
  const amount_sats = Math.round(amount_btc * 100_000_000);
  const payload = {
    amount: amount_sats,
    targetCurrency: target_currency
  };
  const res = await axios.post(
    `${BITNOB_API_URL}/wallet/convert`,
    payload,
    { headers: getHeaders() }
  );
  return res.data.data; // { amount_fiat, rate, ... }
};

// 5. Withdraw to bank/mobile money (example endpoint)
exports.withdrawToBank = async (amount_fiat, bank_details) => {
  const payload = {
    amount: amount_fiat,
    ...bank_details // e.g., { bankAccount, bankCode, ... }
  };
  const res = await axios.post(
    `${BITNOB_API_URL}/wallet/withdraw`,
    payload,
    { headers: getHeaders() }
  );
  return res.data.data;
};
