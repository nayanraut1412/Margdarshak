
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './MeNavbar';
const backendUrl = process.env.REACT_APP_API_URL_PRODUCTION;

const MenteeBooking = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  // Function to fetch all slots for the mentor
  const fetchAvailableSlots = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found, please log in.');
      }

      // Fetch all the slots from the backend
      const response = await axios.get(`${backendUrl}/api/availability/mentor`, {
        headers: { Authorization: token },
      });

      // Set the fetched slots to state
      if (response.status === 200) {
        console.log(response);
        setAvailableSlots(response.data);
      } else {
        throw new Error('Failed to fetch available slots');
      }
    } catch (error) {
      setError('Failed to load available slots');
      console.error('Error fetching available slots:', error);
    }
  };

  // Function to book a slot
  const bookSlot = async (slotId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found, please log in.');
      }

      // Send request to book the slot
      await axios.post(`${backendUrl}/api/availability/book`,
        { slotId },
        {
        headers: { Authorization: token },
      });

      // Refresh the available slots
      fetchAvailableSlots();
    } catch (error) {
      setError('Failed to book slot');
      console.error('Error booking slot:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="py-20">
      <h1 className="text-3xl font-semibold text-center mb-6">Available Slots for Mentoring</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Grid layout for available slots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableSlots.length > 0 ? (
          availableSlots.map((slot) => (
            <div
              key={slot._id}
              className="p-4 bg-white shadow-lg rounded-lg border border-gray-200"
            >
              <div className="mb-4">
                <p className="text-lg font-semibold">Mentor: {slot.mentorId.username}</p>
                <p className="text-gray-600">Expertise: {slot.mentorId.expertise || 'Not specified'}</p>
              </div>
              <div className="mb-4">
                <p className="font-medium">Date: {new Date(slot.date).toLocaleDateString()}</p>
                <p className="font-medium">Time: {slot.time}</p>
              </div>

              {/* Display button if slot is available for booking */}
              {slot.menteeId ? (
                <p className="text-gray-500"><strong>Booked by:</strong> {slot.menteeId.username}</p>
              ) : (
                <button
                  onClick={() => bookSlot(slot._id)}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Book Slot
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-xl">No available slots</p>
        )}
      </div>
    </div>
    </>
  );
};

export default MenteeBooking;
