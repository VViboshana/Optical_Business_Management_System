import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user details including role
        const user = await userModel.findById(decoded.id).select('-password'); // Exclude password for security

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        req.user = user; // Attach user object to the request
        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token.' });
    }
};

// Optional: More specific role-based middleware (can be used instead of checking in route handlers)
export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        return res.status(403).json({ success: false, message: 'Unauthorized: Admin role required.' });
    }
};

export const isInventoryManager = (req, res, next) => {
    if (req.user && req.user.role === 'Inventory Manager') {
        next();
    } else {
        return res.status(403).json({ success: false, message: 'Unauthorized: Inventory Manager role required.' });
    }
};

export const isDoctor = (req, res, next) => {
    if (req.user && req.user.role === 'Doctor') {
        next();
    } else {
        return res.status(403).json({ success: false, message: 'Unauthorized: Doctor role required.' });
    }
};

export const isUser = (req, res, next) => {
    if (req.user && req.user.role === 'User ') { // Note the space
        next();
    } else {
        return res.status(403).json({ success: false, message: 'Unauthorized: User role required.' });
    }
};

// Example of middleware to check email domain for Inventory Managers
export const inventoryEmailDomain = (allowedDomain) => (req, res, next) => {
    if (req.user && req.user.role === 'Inventory Manager' && req.user.email.endsWith(allowedDomain)) {
        next();
    } else {
        return res.status(403).json({ success: false, message: `Unauthorized: Inventory access restricted to emails ending with ${allowedDomain}` });
    }
};