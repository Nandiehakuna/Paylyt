const crypto = require('crypto');

module.exports = (req, res, next) => {
  const signature = req.headers['x-bitnob-signature'];
  const payload = JSON.stringify(req.body);
  const secret = process.env.BITNOB_WEBHOOK_SECRET;
  const hash = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  if (signature !== hash) {
    return res.status(401).json({ error: 'Invalid webhook signature' });
  }
  next();
};