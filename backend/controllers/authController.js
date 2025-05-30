import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import { verifyToken } from '../middleware/authMiddleware.js';

// User signup
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Validation: Check if all required fields are provided
    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Missing Details' });
    }

    try {
        // Validation: Check if the user already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Sending welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to Clear Vision',
            text: `Welcome to Clear Vision website. Your account has been created with email id: ${email}`
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (emailError) {
            console.error('Error sending email:', emailError);
        }

        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// User login
export const login = async (req, res) => {
    const { email, password } = req.body;

    //email and password are provided
    if (!email || !password) {
        return res.json({ success: false, message: 'Email and password are required' });
    }

    try {
        //user exists in the database
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }

        //the password matches
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ success: true });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Logout controller
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({ success: true, message: "Logged Out" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Send verification OTP to the user's email
export const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.body;

        // user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        //account is already verified
        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Account already verified" });
        }

        // Generate OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your OTP is ${otp}. Verify your account using this OTP.`
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'Verification OTP sent to email' });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Verify email using OTP
export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;

    //userId and OTP are provided
    if (!userId || !otp) {
        return res.json({ success: false, message: 'Missing details' });
    }

    try {
        const user = await userModel.findById(userId);

        //user exists
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        // OTP is valid
        if (!user.verifyOtp || user.verifyOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        // OTP has expired
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP expired' });
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();
        return res.json({ success: true, message: 'Email verified successfully' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Send password reset OTP
export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    //email is provided
    if (!email) {
        return res.json({ success: false, message: 'Email is required' });
    }

    try {
        const user = await userModel.findOne({ email });

        //user exists
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for resetting your password is ${otp}.`
        };

        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: 'OTP sent to your email' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Reset user password
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    // Validation: Check if all required fields are provided
    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: 'Email, OTP, and new password are required' });
    }

    try {
        const user = await userModel.findOne({ email });

        // user exists
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        //OTP is valid
        if (!user.resetOtp || user.resetOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        // Validation: Check if OTP has expired
        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP expired' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({ success: true, message: 'Password has been reset successfully' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Example of a protected route that requires a specific role
export const adminDashboard = [verifyToken, (req, res) => {
    // req.user now contains the user's ID and role (from verifyToken middleware)
    if (req.user.role === 'Admin') {
        return res.json({ success: true, message: 'Welcome to the Admin Dashboard!' });
    } else {
        return res.status(403).json({ success: false, message: 'Unauthorized: Admin access required.' });
    }
}];

// Example of a protected route that requires a specific role and filters by email (or domain)
export const inventoryData = [verifyToken, async (req, res) => {
    if (req.user.role === 'Inventory Manager') {
        // Example: Only allow Inventory Managers with emails ending in '@inventory.com'
        if (req.user.email.endsWith('@inventory.com')) {
            // Fetch inventory data relevant to this manager (you'll need your own logic here)
            const inventory = await fetchRelevantInventory(req.user.email);
            return res.json({ success: true, data: inventory });
        } else {
            return res.status(403).json({ success: false, message: 'Unauthorized: Inventory access restricted to specific email domains.' });
        }
    } else {
        return res.status(403).json({ success: false, message: 'Unauthorized: Inventory Manager access required.' });
    }
}];

// Helper function (you'll need to implement this based on your data model)
async function fetchRelevantInventory(email) {
    // Logic to fetch inventory data based on the inventory manager's email
    // This could involve querying a different model and filtering based on some relationship
    return [];
}

// Example of a route accessible to Doctors
export const doctorPortal = [verifyToken, (req, res) => {
    if (req.user.role === 'Doctor') {
        return res.json({ success: true, message: 'Welcome to the Doctor Portal!' });
    } else {
        return res.status(403).json({ success: false, message: 'Unauthorized: Doctor access required.' });
    }
}];

// Example of a route accessible to regular Users
export const userProfile = [verifyToken, (req, res) => {
    if (req.user.role === 'User ') { // Note the space in your role
        return res.json({ success: true, message: 'Welcome to your Profile!' });
    } else {
        return res.status(403).json({ success: false, message: 'Unauthorized: User access required.' });
    }
}];