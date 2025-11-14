const Application = require('../models/Application');
// Freelancer applies to a job
exports.applyToJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const freelancerId = req.user.id;
    const { proposal } = req.body;

    // Prevent duplicate applications
    const existing = await Application.findOne({ where: { job_id: jobId, freelancer_id: freelancerId } });
    if (existing) return res.status(400).json({ error: 'Already applied to this job' });

    const application = await Application.create({
      job_id: jobId,
      freelancer_id: freelancerId,
      proposal
    });
    res.status(201).json({ message: 'Application submitted', application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Freelancer views all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const Job = require('../models/Job');
const Invoice = require('../models/Invoice');
const Ledger = require('../models/Ledger');
const { createLightningInvoice } = require('../services/bitnobService');

// Client posts a job
exports.createJob = async (req, res) => {
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
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Freelancer accepts a job
exports.acceptJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    if (job.status !== 'open') return res.status(400).json({ error: 'Job is not open' });
    job.freelancer_id = req.user.id;
    job.status = 'in_progress';
    await job.save();
    res.json({ message: 'Job accepted', job });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Create Bitnob Lightning invoice for payment
exports.createInvoice = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    if (job.status !== 'in_progress') return res.status(400).json({ error: 'Job not in progress' });

    const invoiceData = await createLightningInvoice(job.amount_btc, job._id);
    const invoice = new Invoice({
      job_id: job._id,
      invoice_id: invoiceData.id,
      payment_request: invoiceData.payment_request,
      status: 'pending'
    });
    await invoice.save();

    res.json({ invoice_id: invoice.invoice_id, payment_request: invoice.payment_request });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Freelancer submits deliverable
exports.completeJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    if (job.status !== 'paid_locked') return res.status(400).json({ error: 'Payment not secured yet' });
    job.status = 'completed';
    await job.save();
    res.json({ message: 'Job marked as completed' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Client approves work
exports.approveJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    if (job.status !== 'completed') return res.status(400).json({ error: 'Job not completed yet' });
    job.status = 'released';
    await job.save();
    res.json({ message: 'Job approved and ready for payout' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Release payment to freelancer (escrow logic)
exports.releasePayment = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findByPk(jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    if (job.status !== 'released') return res.status(400).json({ error: 'Job not approved for payout' });

    // Find the freelancer
    const User = require('../models/User');
    const freelancer = await User.findByPk(job.freelancer_id);
    if (!freelancer) return res.status(404).json({ error: 'Freelancer not found' });

    // Find the paid invoice
    const Invoice = require('../models/Invoice');
    const invoice = await Invoice.findOne({ where: { job_id: jobId, status: 'paid' } });
    if (!invoice) return res.status(400).json({ error: 'No paid invoice for this job' });

    // Mark job as paid out
    job.status = 'paid_out';
    await job.save();

    // Update ledger
    const Ledger = require('../models/Ledger');
    await Ledger.create({
      job_id: jobId,
      invoice_id: invoice.id,
      payment_status: 'released',
      release_timestamp: new Date()
    });

    // (Optional) Call payoutService here for real payout
    // const payoutService = require('../services/payoutService');
    // await payoutService.releasePayment({ amount_btc: job.amount_btc, freelancer_wallet_id: freelancer.bitnob_wallet_id });

    res.json({ message: 'Payment released to freelancer (escrow complete)' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get job status
exports.getJobStatus = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json({ status: job.status });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}