const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Invoice = sequelize.define('Invoice', {
  job_id: DataTypes.INTEGER,
  invoice_id: DataTypes.STRING,
  payment_request: DataTypes.STRING,
  status: { type: DataTypes.ENUM('pending', 'paid', 'expired'), defaultValue: 'pending' }
}, {
  timestamps: true
});

module.exports = Invoice;