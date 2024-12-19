const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log(`datqabse:${process.env.mysqldatabase} and password:${process.env.mysqlpassword}`)
const sequelize = new Sequelize(
    process.env.mysqldatabase, 
    'root', 
    process.env.mysqlpassword, 
    {
      host: "localhost",
      dialect: "mysql",
      logging: console.log,
    }
  );

// Define the connectDB function
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to the MySQL database successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

module.exports = { sequelize, connectDB };
