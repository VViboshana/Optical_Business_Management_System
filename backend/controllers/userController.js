import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';

export const getUserDetails = async(req, res) => {
    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        if(!user){
            return res.json({ success: false, message: 'User not found'});
        }

        res.json({
            success: true,
            userData: {
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified,
                profilePicture: user.profilePicture || ''
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { name, currentPassword, newPassword, profilePicture } = req.body;
        const userId = req.body.userId;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Update name if provided
        if (name) {
            user.name = name;
        }

        // Update profile picture if provided
        if (profilePicture !== undefined) {
            // Validate URL format
            try {
                new URL(profilePicture);
                user.profilePicture = profilePicture.trim();
            } catch (error) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Invalid profile picture URL format' 
                });
            }
        }

        // Update password if provided
        if (newPassword) {
            if (!currentPassword) {
                return res.status(400).json({ success: false, message: 'Current password is required' });
            }

            const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ success: false, message: 'Current password is incorrect' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
        }

        // Ensure role is not modified and is in correct format
        if (user.role) {
            user.role = user.role.toLowerCase().trim();
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error updating profile',
            error: error.message 
        });
    }
};