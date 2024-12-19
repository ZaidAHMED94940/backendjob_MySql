const express = require('express');
const { connectDB } = require('./config/sqlconnection');
const { sequelize } = require('./config/sqlconnection');
const userRoutes=require("./controller/UserRoutes")
const bodyParser = require('body-parser');
const app = express();
const port = 3002;
const dotenv=require('dotenv')
dotenv.config()

connectDB();  // Establish connection to DB
app.use(bodyParser.json()); // For parsing JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json())
app.use('/api/v1/user',userRoutes)
// Sync models with the database
sequelize.sync({ force: false })  // Set to 'true' during development for fresh tables
  .then(() => {
    console.log('Database synchronized successfully!');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${port}`);
});
