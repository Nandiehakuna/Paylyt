const { payoutToWallet, convertBTCtoFiat } = require('./bitnobService');

// Release payment to freelancer (BTC or fiat)
exports.releasePayment = async ({ amount_btc, freelancer_wallet_id, convert, target_currency }) => {
  if (convert && target_currency) {
    // Convert BTC to fiat before payout
    const conversion = await convertBTCtoFiat(amount_btc, target_currency);
    // You may need to implement payout to fiat wallet or bank here
    return { conversion, payout: 'Conversion complete. Withdraw from Bitnob fiat wallet.' };
  } else {
    // Direct BTC payout to freelancer's wallet
    const payout = await payoutToWallet(amount_btc, freelancer_wallet_id);
    return payout; // { tx_id, ... }
  }
};