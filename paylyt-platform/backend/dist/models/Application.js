"use strict";
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Application = sequelize.define('Application', {
    job_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    freelancer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    proposal: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
        defaultValue: 'pending'
    }
}, {
    timestamps: true
});
module.exports = Application;
