const User = require('../models/User');
const bcrypt = require('bcryptjs');


const getUserProfile = async (req, res) => {
    if (req.user) {
        res.json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            photo: req.user.photo,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.photo) {
            user.photo = req.body.photo;
        }
        if (req.body.newPassword) {
            if (req.body.currentPassword) {
                const isMatch = await user.matchPassword(req.body.currentPassword);
                if (!isMatch) {
                    return res.status(401).json({ message: 'Current password is incorrect' });
                }
            } else {
                 return res.status(400).json({ message: 'Current password is required to set a new one' });
            }
            user.password = req.body.newPassword;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            photo: updatedUser.photo,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
};
