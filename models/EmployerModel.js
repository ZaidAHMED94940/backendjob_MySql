const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/sqlconnection');

class Employer extends Model {}

Employer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Validate email format
      },
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true, // Ensure it's numeric
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 255], // Minimum password length
      },
    },
    apiToken: {
      type: DataTypes.STRING,
      allowNull: true, // Token can be nullable initially
      unique: true, // Ensure no duplicate tokens
    },
  },
  {
    sequelize,
    tableName: 'employers',
    timestamps: true,
  }
);

module.exports = Employer;
