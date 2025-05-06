import express from 'express';
const router = express.Router();
import {
    register,
    login,
    logout,
    sendVerifyOtp,
    verifyEmail,
    sendResetOtp,
    resetPassword,
    adminDashboard,
    inventoryData,
    doctorPortal,
    userProfile
} from '../controllers/authController.js';
import { verifyToken, isAdmin, isInventoryManager, isDoctor, isUser, inventoryEmailDomain } from '../middleware/authMiddleware.js';

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/send-verify-otp', sendVerifyOtp);
router.post('/verify-email', verifyEmail);
router.post('/send-reset-otp', sendResetOtp);
router.post('/reset-password', resetPassword);

// Protected routes with role-based access control
router.get('/admin/dashboard', adminDashboard);
router.get('/inventory/data', inventoryData);
router.get('/doctor/portal', doctorPortal);
router.get('/user/profile', userProfile);

// Example using specific role-based middleware
// router.get('/api/admin/users', verifyToken, isAdmin, getUsers);
// router.get('/api/inventory/items', verifyToken, isInventoryManager, getInventoryItems);
// router.get('/api/doctor/patients', verifyToken, isDoctor, getPatients);
// router.get('/api/user/settings', verifyToken, isUser, getUserSettings);

// Example using email domain restriction middleware
// router.get('/api/inventory/restricted', verifyToken, inventoryEmailDomain('@specific-inventory.com'), getRestrictedInventory);

export default router;