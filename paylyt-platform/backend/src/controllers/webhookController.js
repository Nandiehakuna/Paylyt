const Invoice = require('../models/Invoice');
const Job = require('../models/Job');
const Ledger = require('../models/Ledger');
const { logAudit } = require('../utils/auditLogger');

// Handle Bitnob webhook: invoice.paid → set paid_locked
exports.handleBitnobWebhook = async (req, res) => {
  try {
    const { event, data } = req.body;
    if (event !== 'invoice.paid') {
      return res.status(400).json({ error: 'Unsupported event' });
    }

    // Find the invoice and update status (Sequelize)
    const invoice = await Invoice.findOne({ where: { invoice_id: data.id } });
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

    invoice.status = 'paid';
    await invoice.save();

    // Update the related job status to paid_locked (Sequelize)
    const job = await Job.findByPk(invoice.job_id);
    if (job) {
      job.status = 'paid_locked';
      await job.save();
    }

    // Record in ledger (Sequelize)
    await Ledger.create({
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};