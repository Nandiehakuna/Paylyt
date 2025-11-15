const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Profile = sequelize.define('Profile', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  skills: {
    type: DataTypes.JSON, // Storing skills as a JSON array
    allowNull: true
  },
  hourly_rate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  portfolio: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Profile;