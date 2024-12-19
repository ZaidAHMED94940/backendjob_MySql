const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/sqlconnection');  // Ensure sequelize is imported correctly

console.log(sequelize);  // Check if sequelize is correctly imported

class User extends Model {}

User.init(
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
        isEmail: true,  // Validate email format
      },
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt:true  // Validate phone number length
      },
    },
    role: {
      type: DataTypes.ENUM('applicant', 'employer'),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 255],  // Minimum password length
      },
    },
  },
  {
    sequelize,  // Pass the sequelize instance
    tableName: 'users',  // Define the table name
    timestamps: true,     // Automatically manage createdAt and updatedAt columns
  }
);

module.exports = User;
