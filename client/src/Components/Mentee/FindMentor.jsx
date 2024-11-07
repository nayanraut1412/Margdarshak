// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaCalendarAlt, FaClock } from 'react-icons/fa';

// const backendUrl = process.env.REACT_APP_API_URL_LOCAL;



// const MenteeDashboard = () => {
//   const [mentors, setMentors] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMentors = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           throw new Error('User not authenticated');
//         }
//         console.log("Backend URL from .env:", backendUrl);

//         const response = await axios.get(`${backendUrl}/api/mentors/all-mentors-availability`, {
//           headers: { Authorization: `${token}` },
//         });

//         if (response.status === 200) {
//           setMentors(response.data);
//         } else {
//           setError('Failed to fetch mentors data');
//         }
//       } catch (error) {
//         console.error('Error fetching mentors:', error);
//         setError(error.response?.data?.message || 'Failed to load mentors data');
//       }
//     };

//     fetchMentors();
//   }, []);

//   // Function to book a slot
//   const bookSlot = async (mentorId, slotId) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('User not authenticated');
//       }

//       const response = await axios.patch(
//         `https://margdarshak-8rct.onrender.com/api/mentors/book-slot`,
//         { mentorId, slotId },
//         { headers: { Authorization: `${token}` } }
//       );

//       if (response.status === 200) {
//         // Update the slot's availability status to booked in the local state
//         setMentors((prevMentors) =>
//           prevMentors.map((mentor) =>
//             mentor._id === mentorId
//               ? {
//                   ...mentor,
//                   availability: mentor.availability.map((slot) =>
//                     slot._id === slotId ? { ...slot, isBooked: true } : slot
//                   ),
//                 }
//               : mentor
//           )
//         );
//       }
//     } catch (error) {
//       console.error('Error booking slot:', error);
//       setError('Failed to book slot');
//     }
//   };

//   return (
//     <div className="max-w-screen-xl my-20 px-4 md:px-20 mx-auto bg-white rounded-lg shadow-md">
//       <h1 className="text-3xl font-bold py-0 mb-8 text-center text-blue-600">Available Mentors</h1>
//       {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
//       {mentors.length > 0 ? (
//         <div className="grid grid-cols-1 py-4 md:grid-cols-2 gap-8">
//           {mentors.map((mentor) => (
//             <div key={mentor._id} className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
//               <h2 className="text-2xl font-semibold text-blue-700">{mentor.username}</h2>
//               <p className="text-gray-600 mt-2">Expertise: <span className="font-medium">{mentor.expertise}</span></p>
              
//               <div className="mt-4">
//                 <h3 className="font-medium text-blue-600">Availability:</h3>
//                 {mentor.availability.length > 0 ? (
//                   <ul className="mt-2 space-y-2">
//                     {mentor.availability.map((slot, index) => (
//                       <li key={index} className="flex items-center justify-between text-gray-700 space-x-4">
//                         <div className="flex items-center space-x-2">
//                           <FaCalendarAlt className="text-blue-500" />
//                           <span>{new Date(slot.date).toLocaleDateString('en-GB', {
//                             day: '2-digit',
//                             month: 'short',
//                             year: 'numeric'
//                           })}</span>
//                           <FaClock className="text-blue-500" />
//                           <span>{slot.time}</span>
//                         </div>
//                         {slot.isBooked ? (
//                           <span className="text-green-600 font-medium">Booked</span>
//                         ) : (
//                           <button
//                             onClick={() => bookSlot(mentor._id, slot._id)}
//                             className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded"
//                           >
//                             Book Slot
//                           </button>
//                         )}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-gray-500 mt-2">No availability added yet.</p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500 text-center mt-8">No mentors available.</p>
//       )}
//     </div>
//   );
// };

// export default MenteeDashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './MeNavbar';
const backendUrl = process.env.REACT_APP_API_URL_LOCAL;

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
