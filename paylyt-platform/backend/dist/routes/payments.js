"use strict";
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middlewares/auth');
// Convert BTC to fiat via Bitnob
router.post('/convert', auth, paymentController.convertBTC);
// Withdraw to bank/mobile money
router.post('/withdraw', auth, paymentController.withdraw);
// Generate a Lightning invoice for a contract deposit
// router.post('/deposit', auth, paymentController.deposit);
// Check the status of a Lightning invoice
// router.get('/invoice/:id', auth, paymentController.checkInvoice);
module.exports = router;
