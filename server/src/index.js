// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const mentorRoutes = require('./routes/mentors');
const authRoutes = require('./routes/auth');
const menteeRoutes = require('./routes/mentee');
const availabilityRoutes = require('./routes/availability');


const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/mentors', mentorRoutes);  
app.use('/api/mentee', menteeRoutes); 
app.use('/api/availability', availabilityRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
