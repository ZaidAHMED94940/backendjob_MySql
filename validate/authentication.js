const jwt = require('jsonwebtoken');
const Employer = require('../models/Employer');
const JWT_SECRET = 'your_secrt_key'; // Replace with a strong secret key

// Middleware to authenticate JWT
const authenticateJWT = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
const generateApiToken = (employerId) => {
    return jwt.sign({ employerId }, JWT_SECRET, { expiresIn: '30d' }); // Token valid for 30 days
};
const authenticateEmployerToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'API token is required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const employer = await Employer.findOne({ where: { id: decoded.employerId } });

        if (!employer) {
            return res.status(403).json({ message: 'Invalid or unauthorized token' });
        }

        req.employer = employer; // Attach employer info to the request
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
module.exports={ authenticateJWT,generateApiToken,authenticateEmployerToken};