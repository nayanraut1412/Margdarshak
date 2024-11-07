const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  expertise: { type: String, required: true },
  role: { type: String, enum: ['mentee', 'mentor'], required: true },
// availability: [
//     {
//       date: { type: Date, required: true },
//       time: { type: String, required: true },
//       isBooked: { type: Boolean, default: false }
//     }
//   ]
});


// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Check password validity
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
