const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const ConversionTransaction = sequelize.define('ConversionTransaction', {
	job_id: DataTypes.INTEGER,
	user_id: DataTypes.INTEGER,
	amount_btc: DataTypes.FLOAT,
	amount_fiat: DataTypes.FLOAT,
	rate: DataTypes.FLOAT,
	timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
	timestamps: false
});

module.exports = ConversionTransaction;
