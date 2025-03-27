// src/users/user.route.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./user.model');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Route đăng nhập admin
router.post('/admin', async (req, res) => {
  const { username, password } = req.body;
  console.log('Admin login request:', req.body);
  try {
    const admin = await User.findOne({ username });
    console.log('Found admin:', admin);
    if (!admin) {
      return res.status(404).send({ message: 'Admin not found!' });
    }

    const match = await bcrypt.compare(password, admin.password);
    console.log('Password match:', match);
    if (!match) {
      return res.status(401).send({ message: 'Invalid password!' });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Authentication successful',
      token: token,
      user: {
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Failed to login as admin', error);
    return res.status(401).send({ message: 'Failed to login as admin' });
  }
});

module.exports = router;
