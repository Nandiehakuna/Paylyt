const { convertBTCtoFiat } = require('../services/bitnobService');
const { releasePayment } = require('../services/payoutService');

// Convert BTC to fiat via Bitnob
exports.convertBTC = async (req, res) => {
  try {
    const { amount_btc, target_currency } = req.body;
    if (!amount_btc || !target_currency) {
      return res.status(400).json({ error: 'amount_btc and target_currency are required' });
    }
    const result = await convertBTCtoFiat(amount_btc, target_currency);
    res.json({ message: 'Conversion successful', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Withdraw to bank/mobile money (to be implemented)
exports.withdraw = async (req, res) => {
  // This would typically call Bitnob's withdrawal API
  res.json({ message: 'Withdraw endpoint (to be implemented)' });
};