const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../config/sqlconnection'); // Adjust the path based on your project structure

class JobModel extends Model {}

JobModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience_range: {
      type: DataTypes.STRING, // Example: "2-5 years"
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_type: {
      type: DataTypes.STRING, // Example: "Full-time", "Part-time", "Contract"
      allowNull: false,
    },
    salary_range: {
      type: DataTypes.STRING, // Example: "50000-70000"
      allowNull: true,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qualifications: {
      type: DataTypes.TEXT, // Example: "Bachelor's Degree in Computer Science"
      allowNull: true,
    },
    skills_required: {
      type: DataTypes.TEXT, // Example: "JavaScript, Node.js, SQL"
      allowNull: true,
    },
    job_description: {
      type: DataTypes.TEXT, // Detailed description of the job responsibilities
      allowNull: true,
    },
    benefits: {
      type: DataTypes.TEXT, // Example: "Health Insurance, Retirement Plan"
      allowNull: true,
    },
    apply_link: {
      type: DataTypes.STRING, // Link to apply for the job
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('open', 'closed', 'pending'), // Example: "open", "closed", "pending"
      allowNull: false,
      defaultValue: 'open',
    },
  },
  {
    sequelize,           // Sequelize instance
    modelName: 'JobModel', // Model name
    tableName: 'job_descriptions', // Custom table name
    timestamps: true,    // Adds createdAt and updatedAt fields
  }
);

module.exports = JobModel;
