// models/availability.js
const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  menteeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  isBooked: { type: Boolean, default: false }
});

module.exports = mongoose.model('Availability', availabilitySchema);
