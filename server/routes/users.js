const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all users
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find({ username: { $ne: 'admin' } }).sort({ createdAt: -1 }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new user
router.post('/', auth, async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const user = new User(rest);
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update own profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, email, phone, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update basic info
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    // Handle password change
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Password saat ini salah' });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();
    
    const updatedUser = await User.findById(req.user.id).select('-password');
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a user
router.put('/:id', auth, async (req, res) => {
  try {
    let updateData = { ...req.body };
    
    // Hash password if it's being updated
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }
    
    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user
router.delete('/:id', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
