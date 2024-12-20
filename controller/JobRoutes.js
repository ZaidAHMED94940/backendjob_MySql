const express = require('express');
const router = express.Router();
const JobModel = require('../models/JobModel');
// const authenticateEmployerToken = require('../middleware/authenticateEmployerToken');

router.post('/create-job', async (req, res) => {
    const { title, job_description, location, department, skills_required, experience_range, job_type, status } = req.body;

    try {
        // Validate required fields
        if (!title || !job_description || !location || !experience_range || !job_type) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create job posting
        const job = await JobModel.create({
            title,
            job_description,
            location,
            department,            // Optional
            skills_required,       // Optional
            experience_range,      // Optional
            job_type,
            status: status || 'open', // Default to 'open' if status is not provided
        });

        res.status(201).json(job);
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Validation error', errors: error.errors });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
