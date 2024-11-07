// In your routes (e.g., userRoutes.js)

const express = require('express');
const User = require('../models/user');
const { verifyToken } = require('../middlewares/authMiddleware'); // Ensure correct import
const jwt = require('jsonwebtoken');


const router = express.Router();
router.get('/username', verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('username'); // Adjust as needed to retrieve only necessary fields
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

  module.exports = router;