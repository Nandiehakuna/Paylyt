"use strict";
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    role: { type: DataTypes.ENUM('client', 'freelancer', 'admin'), defaultValue: 'client' },
    bitnob_wallet_id: DataTypes.STRING,
    external_address: DataTypes.STRING
}, {
    timestamps: true
});
module.exports = User;
