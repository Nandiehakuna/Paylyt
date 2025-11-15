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
const Invoice = require('../models/Invoice');
const Job = require('../models/Job');
const Ledger = require('../models/Ledger');
const { logAudit } = require('../utils/auditLogger');
// Handle Bitnob webhook: invoice.paid → set paid_locked
exports.handleBitnobWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { event, data } = req.body;
        if (event !== 'invoice.paid') {
            return res.status(400).json({ error: 'Unsupported event' });
        }
        // Find the invoice and update status (Sequelize)
        const invoice = yield Invoice.findOne({ where: { invoice_id: data.id } });
        if (!invoice)
            return res.status(404).json({ error: 'Invoice not found' });
        invoice.status = 'paid';
        yield invoice.save();
        // Update the related job status to paid_locked (Sequelize)
        const job = yield Job.findByPk(invoice.job_id);
        if (job) {
            job.status = 'paid_locked';
            yield job.save();
        }
        // Record in ledger (Sequelize)
        yield Ledger.create({
            job_id: invoice.job_id,
            invoice_id: invoice.id,
            payment_status: 'paid_locked',
            lock_timestamp: new Date()
        });
        // Audit log
        logAudit('invoice.paid', {
            invoice_id: invoice.invoice_id,
            job_id: invoice.job_id,
            user: job ? job.freelancer_id : null
        });
        res.json({ message: 'Invoice marked as paid and funds locked' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
