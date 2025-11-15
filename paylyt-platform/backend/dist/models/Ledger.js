"use strict";
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Ledger = sequelize.define('Ledger', {
    job_id: DataTypes.INTEGER,
    invoice_id: DataTypes.INTEGER,
    payment_status: { type: DataTypes.STRING, allowNull: false },
    lock_timestamp: DataTypes.DATE,
    release_timestamp: DataTypes.DATE,
    release_tx_id: DataTypes.STRING
}, {
    timestamps: true
});
module.exports = Ledger;
