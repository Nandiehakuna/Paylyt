const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Job = sequelize.define('Job', {
  client_id: DataTypes.INTEGER,
  freelancer_id: DataTypes.INTEGER,
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  amount_fiat: DataTypes.FLOAT,
  amount_btc: DataTypes.FLOAT,
  status: { type: DataTypes.ENUM('open', 'in_progress', 'paid_locked', 'completed', 'released', 'disputed'), defaultValue: 'open' },
  deadline: DataTypes.DATE,
  milestones: DataTypes.TEXT // Store as JSON string if needed
}, {
  timestamps: true
});

module.exports = Job;