// routes/availability.js
const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Availability = require('../models/availability');
const { verifyToken } = require('../middlewares/authMiddleware');

// Add availability slot
router.post('/add', verifyToken, async (req, res) => {
  try {
    const { date, time } = req.body;
    const mentorId = req.user.id;

    const newSlot = new Availability({ mentorId, date, time });
    await newSlot.save();

    res.status(201).json(newSlot);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add availability slot' });
  }
});

// fetch Availability slots
router.get('/mentor', verifyToken, async (req, res) => {
  try {
    const mentorSlots = await Availability.find({ isBooked: false }) 
      .populate('mentorId', 'username expertise')  // mentor details
      .populate('menteeId', 'username') 
      .lean(); 
    
    // console.log('Available slots:', mentorSlots);

    res.status(200).json(mentorSlots);  // Send available slots to the frontend
  } catch (error) {
    console.error('Error fetching available slots:', error);
    res.status(500).json({ error: 'Failed to fetch available slots' });
  }
});



// Book a slot by mentee
router.post('/book', verifyToken, async (req, res) => {
  try {
    const { slotId } = req.body;
    const menteeId = req.user.id;

    const slot = await Availability.findById(slotId);
    if (!slot) return res.status(404).json({ error: 'Slot not found' });
    if (slot.isBooked) return res.status(400).json({ error: 'Slot already booked' });

    slot.isBooked = true;
    slot.menteeId = menteeId;
    await slot.save();

    res.status(200).json({ message: 'Slot booked successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to book slot' });
  }
});

// Update availability 
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { date, time } = req.body;
    const slotId = req.params.id;

    const slot = await Availability.findById(slotId);
    if (!slot) return res.status(404).json({ error: 'Slot not found' });

    // Update slot details
    slot.date = new Date(date);
    slot.time = time;
    await slot.save();

    res.status(200).json(slot);  // Return updated slot
  } catch (error) {
    res.status(500).json({ error: 'Failed to update slot' });
  }
});

// Delete a slot
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Availability.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Slot deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete slot' });
  }
});



// Fetch all booked slots for a mentor
router.get('/booked', verifyToken, async (req, res) => {
  try {
    const mentorId = req.user.id; 

    const bookedSlots = await Availability.find({ mentorId, isBooked: true })
      .populate('mentorId', 'username expertise') 
      .populate('menteeId', 'username expertise') 
      .lean(); 

    if (!bookedSlots || bookedSlots.length === 0) {
      return res.status(404).json({ error: 'No booked slots found' });
    }

    // console.log('Booked slots:', bookedSlots); // Log the booked slots to check

    // Send the booked slots as a response
    res.status(200).json(bookedSlots);
  } catch (error) {
    console.error('Error fetching booked slots:', error);
    res.status(500).json({ error: 'Failed to fetch booked slots' });
  }
});

module.exports = router;

