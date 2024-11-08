import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './MrNavbar';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const backendUrl = process.env.REACT_APP_API_URL;

const MentorRequests = () => {
  const [bookedSlots, setBookedSlots] = useState([]);
  const [error, ] = useState(null);

  useEffect(() => {
    fetchBookedSlots();
  }, []);

  // Function to fetch booked slots
  const fetchBookedSlots = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found, please log in.');
      } 

      const response = await axios.get(`${backendUrl}/api/availability/booked`, {
        headers: { Authorization: token },
      });

      if (response.status === 200) {
        setBookedSlots(response.data);
      } else {
        throw new Error('Failed to fetch booked slots');
      }
    } catch (error) {
      toast.error('Failed to load booked slots');
      console.error('Error fetching booked slots:', error);
    }
  };

  return (
    <>
      <Navbar />
     
      {/* <div className="mt-8"> */}
        <ToastContainer 
          position="top-right"
          autoClose={3000}           // Auto close after 3 seconds
          hideProgressBar={false}     // Show or hide the progress bar
          closeOnClick                // Close on click
          pauseOnHover                // Pause on hover
          draggable     
          transition={Slide}  
          className="mt-14" 
                     
        />
      {/* </div> */}
      <div className="container mx-auto p-20">
        <h2 className="text-2xl font-semibold text-center mb-4">Mentee's Request</h2>
        {error && <p className="text-red-500">{error}</p>}
        
        {/* Display booked slots in a grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookedSlots.length > 0 ? (
            bookedSlots.map((slot) => (
              <div key={slot._id} className="bg-white p-4 rounded shadow-md space-y-4">
                
                <p><strong>Date:</strong> {new Date(slot.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {slot.time}</p>
                
                <div>
                  <p><strong>Mentee Name:</strong> {slot.menteeId.username}</p>
                  <p><strong>Mentee Expertise:</strong> {slot.menteeId.expertise}</p>
                </div>

                {/* Button for actions like accepting or rejecting */}
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No booked slots available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MentorRequests;
