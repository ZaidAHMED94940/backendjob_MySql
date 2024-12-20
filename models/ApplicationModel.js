const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/sqlconnection');

class Applicant extends Model {}

Applicant.init(
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
  },
  {
    sequelize,
    tableName: 'applicants',
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

module.exports = Applicant;
