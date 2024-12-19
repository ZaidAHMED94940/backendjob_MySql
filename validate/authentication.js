const jwt = require('jsonwebtoken');

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
export default authenticateJWT;