const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middlewares/auth');

// Convert BTC to fiat via Bitnob
router.post('/convert', auth, paymentController.convertBTC);

// Withdraw to bank/mobile money
router.post('/withdraw', auth, paymentController.withdraw);

module.exports = router;