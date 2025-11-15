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
const Application = require('../models/Application');
// Freelancer applies to a job
exports.applyToJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobId = req.params.id;
        const freelancerId = req.user.id;
        const { proposal } = req.body;
        // Prevent duplicate applications
        const existing = yield Application.findOne({ where: { job_id: jobId, freelancer_id: freelancerId } });
        if (existing)
            return res.status(400).json({ error: 'Already applied to this job' });
        const application = yield Application.create({
            job_id: jobId,
            freelancer_id: freelancerId,
            proposal
        });
        res.status(201).json({ message: 'Application submitted', application });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Freelancer views all jobs
exports.getAllJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield Job.findAll();
        res.json(jobs);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
const Job = require('../models/Job');
const Invoice = require('../models/Invoice');
const Ledger = require('../models/Ledger');
const { createLightningInvoice } = require('../services/bitnobService');
// Client posts a job
exports.createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, amount_fiat, amount_btc, deadline, milestones } = req.body;
        const job = new Job({
            client_id: req.user.id,
            title,
            description,
            amount_fiat,
            amount_btc,
            deadline,
            milestones
        });
        yield job.save();
        res.status(201).json(job);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// Client accepts an application
exports.acceptJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const job = yield Job.findById(req.params.id);
        if (!job)
            return res.status(404).json({ error: 'Job not found' });
        if (job.status !== 'open')
            return res.status(400).json({ error: 'Job is not open' });
        const { applicationId } = req.body;
        const application = yield Application.findById(applicationId);
        if (!application || application.job_id !== job._id)
            return res.status(400).json({ error: 'Invalid application' });
        job.freelancer_id = application.freelancer_id;
        job.status = 'in_progress';
        yield job.save();
        res.json({ message: 'Application accepted', job });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// Create Bitnob Lightning invoice for payment
exports.createInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const job = yield Job.findById(req.params.id);
        if (!job)
            return res.status(404).json({ error: 'Job not found' });
        if (job.status !== 'in_progress')
            return res.status(400).json({ error: 'Job not in progress' });
        const invoiceData = yield createLightningInvoice(job.amount_btc, job._id);
        const invoice = new Invoice({
            job_id: job._id,
            invoice_id: invoiceData.id,
            payment_request: invoiceData.payment_request,
            status: 'pending'
        });
        yield invoice.save();
        res.json({ invoice_id: invoice.invoice_id, payment_request: invoice.payment_request });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// Freelancer submits deliverable
exports.completeJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const job = yield Job.findById(req.params.id);
        if (!job)
            return res.status(404).json({ error: 'Job not found' });
        if (job.status !== 'paid_locked')
            return res.status(400).json({ error: 'Payment not secured yet' });
        job.status = 'completed';
        yield job.save();
        res.json({ message: 'Job marked as completed' });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// Client approves work
exports.approveJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const job = yield Job.findById(req.params.id);
        if (!job)
            return res.status(404).json({ error: 'Job not found' });
        if (job.status !== 'completed')
            return res.status(400).json({ error: 'Job not completed yet' });
        job.status = 'released';
        yield job.save();
        res.json({ message: 'Job approved and ready for payout' });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// Release payment to freelancer (escrow logic)
exports.releasePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobId = req.params.id;
        const job = yield Job.findByPk(jobId);
        if (!job)
            return res.status(404).json({ error: 'Job not found' });
        if (job.status !== 'released')
            return res.status(400).json({ error: 'Job not approved for payout' });
        // Find the freelancer
        const User = require('../models/User');
        const freelancer = yield User.findByPk(job.freelancer_id);
        if (!freelancer)
            return res.status(404).json({ error: 'Freelancer not found' });
        // Find the paid invoice
        const Invoice = require('../models/Invoice');
        const invoice = yield Invoice.findOne({ where: { job_id: jobId, status: 'paid' } });
        if (!invoice)
            return res.status(400).json({ error: 'No paid invoice for this job' });
        // Mark job as paid out
        job.status = 'paid_out';
        yield job.save();
        // Update ledger
        const Ledger = require('../models/Ledger');
        yield Ledger.create({
            job_id: jobId,
            invoice_id: invoice.id,
            payment_status: 'released',
            release_timestamp: new Date()
        });
        // (Optional) Call payoutService here for real payout
        // const payoutService = require('../services/payoutService');
        // await payoutService.releasePayment({ amount_btc: job.amount_btc, freelancer_wallet_id: freelancer.bitnob_wallet_id });
        res.json({ message: 'Payment released to freelancer (escrow complete)' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Get job by id
exports.getJobById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const job = yield Job.findById(req.params.id);
        if (!job)
            return res.status(404).json({ error: 'Job not found' });
        res.json(job);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Get applications for a job
exports.getApplicationsForJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applications = yield Application.findAll({ where: { job_id: req.params.id } });
        res.json(applications);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Get job status
exports.getJobStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const job = yield Job.findById(req.params.id);
        if (!job)
            return res.status(404).json({ error: 'Job not found' });
        res.json({ status: job.status });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
