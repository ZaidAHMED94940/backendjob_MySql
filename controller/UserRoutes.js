const express = require('express');
const bcrypt = require('bcrypt'); // Import bcrypt
const Router = express.Router();
const User = require('../models/UserModels');

// Create User
Router.post('/create-user', async (req, res) => {
    const { name, email, number, role, password } = req.body;

    if (!['applicant', 'employer'].includes(role)) {
        return res.status(406).json({ message: "Invalid Role. Must be either applicant or employer" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 8); // Fix the variable name
        const newUser = await User.create({ name, email, number, role, password: hashedPassword }); // Save hashed password
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in creating the user" });
    }
});

// Delete User by Email
Router.delete('/delete-user/:email', async (req, res) => {
    const { email } = req.params; // Fix destructuring
    if (!email) {
        return res.status(407).json({ message: "Email is required" });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(409).json({ message: "User not found" });
        }
        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" }); // Send success message
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get User by Email
Router.get('/useremail/:email', async (req, res) => {
    const { email } = req.params; // Fix destructuring
    if (!email) {
        return res.status(407).json({ message: "Email is required" });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(402).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update User by Email
Router.put('/user/:email', async (req, res) => {
    const { name, email, number, role, password } = req.body;

    if (!['applicant', 'employer'].includes(role)) {
        return res.status(409).json({ message: "Invalid Role. Must be either applicant or employer" });
    }

    try {
        const user = await User.findOne({ where: { email: req.params.email } }); // Fix email parameter usage
        if (!user) {
            return res.status(402).json({ message: "User not found" });
        }

        if (password) {
            user.password = await bcrypt.hash(password, 8); // Hash the password
        }
        user.name = name || user.name;
        user.email = email || user.email;
        user.number = number || user.number;
        user.role = role || user.role;

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send('Error while updating user');
    }
});

module.exports = Router;
