const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { verifyToken } = require('../middlewares/authMiddleware'); // Ensure correct import

// Add availability date and time for the mentor
router.post('/availability', verifyToken, async (req, res) => {
  try {
    const { date, time } = req.body; // Extract date and time from the request body
    const userId = req.user.id; // User ID from the token
    // console.log('inside the mentor.js',req.body);

    // Find the mentor by user ID
    const mentor = await User.findById(userId);
    if (!mentor) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Ensure availability field exists as an array
    if (!mentor.availability) {
      mentor.availability = [];
    }

    // Add new availability entry to the mentor's availability array
    mentor.availability.push({ date, time, isBooked: false });

    // Save the updated mentor document
    await mentor.save();

    res.status(201).json({
      message: 'Availability added successfully',
      availability: mentor.availability, // Return updated availability list
    });
  } catch (error) {
    console.error('Error adding availability:', error);
    res.status(500).json({ error: 'Failed to add availability' });
  }
});


router.get('/availability', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const mentor = await User.findById(userId);

    if (!mentor) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(mentor.availability);
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ error: 'Failed to fetch availability' });
  }
});

// DELETE availability by ID
router.delete('/availability/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params; // This is the availability item ID
    const userId = req.user.id; // The ID of the user making the request

    // Find the mentor (user) by their ID
    const mentor = await User.findById(userId);
    if (!mentor) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the index of the availability entry to be deleted
    const availabilityIndex = mentor.availability.findIndex(
      (availability) => availability._id.toString() === id
    );

    // If the availability entry is not found, return an error
    if (availabilityIndex === -1) {
      return res.status(404).json({ message: 'Availability not found' });
    }

    // Remove the availability entry from the array
    console.log(availabilityIndex);
    mentor.availability.splice(availabilityIndex, 1);

    // Save the updated user document
    await mentor.save();

    res.status(200).json({ message: 'Availability deleted successfully' });
  } catch (error) {
    console.error('Error deleting availability:', error);
    res.status(500).json({ message: 'Server error, failed to delete availability' });
  }
});


// Get all mentors' availability for mentee dashboard
router.get('/all-mentors-availability', verifyToken, async (req, res) => {
  try {
    // Fetch mentors with their name, expertise, and availability
    const mentors = await User.find({ role: 'mentor' }, 'username expertise availability');
    
    if (!mentors) {
      return res.status(404).json({ message: 'No mentors found' });
    }

    res.status(200).json(mentors);
  } catch (error) {
    console.error('Error fetching mentors:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Route to book a slot
router.patch('/book-slot', verifyToken, async (req, res) => {
  const { mentorId, slotId } = req.body;
  console.log(mentorId, slotId);

  try {
    const mentor = await User.findOneAndUpdate(
      { _id: mentorId, 'availability._id': slotId, 'availability.isBooked': false }, // Check if the slot is not already booked
      { $set: { 'availability.$.isBooked': true } }, // Update `isBooked` to true
      { new: true }
    );

    if (!mentor) {
      return res.status(404).json({ message: 'Mentor or slot not found, or already booked' });
    }

    res.status(200).json({ message: 'Slot booked successfully', mentor });
  } catch (error) {
    console.error('Error booking slot:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;


