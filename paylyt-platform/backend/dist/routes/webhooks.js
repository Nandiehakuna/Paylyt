"use strict";
const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');
const verifyHmac = require('../middlewares/verifyHmac');
// Bitnob webhook: handle invoice.paid → set paid_locked
router.post('/bitnob', verifyHmac, webhookController.handleBitnobWebhook);
module.exports = router;
