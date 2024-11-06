import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Availability = () => {
  const [availability, setAvailability] = useState({ date: '', time: '' });
  const [availabilityList, setAvailabilityList] = useState([]);
  const [error, setError] = useState(null);

  // Fetch previously added availability on component mount
  const fetchAvailability = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found, please log in.');
      }

      const response = await axios.get('https://margdarshak-8rct.onrender.com/api/mentors/availability', {
        headers: { Authorization: `${token}` },
      });

      if (response.status === 200) {
        const sortedAvailability = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));

        setAvailabilityList(sortedAvailability);
      } else {
        setError('Failed to fetch availability data');
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
      setError(error.response?.data?.message || 'Failed to load availability');
    }
  }, []);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAvailability({ ...availability, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await axios.post(
        'https://margdarshak-8rct.onrender.com/api/mentors/availability',
        availability,
        {
          headers: { Authorization: token },
        }
      );

      if (response.status === 201) {
        alert('Availability added successfully!');
        setAvailabilityList((prev) => {
          const updatedList = [...prev, response.data];
          return updatedList.sort((a, b) => new Date(a.date) - new Date(b.date));
        });
        
        setAvailability({ date: '', time: '' }); // Reset form
        fetchAvailability(); // Fetch the updated availability list
      } else {
        throw new Error('Failed to add availability');
      }
    } catch (error) {
      console.error('Error adding availability:', error);
      setError(error.response?.data?.message || 'Failed to add availability');
    }
  };

  // Handle delete availability
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      await axios.delete(`https://margdarshak-8rct.onrender.com/api/mentors/availability/${id}`, {
        headers: { Authorization: token },
      });

      fetchAvailability(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting availability:', error);
      setError('Failed to delete availability');
    }
  };

  return (
    <div className="ustify-center hero-page p-6 w-full rounded-lg bg-white shadow-md">
    <div className="flex justify-center text-center">
        Cloud Computing CA-2
      </div>
      <h2 className="text-3xl font-bold p-5 mb-6 text-center">Manage Your Availability</h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column: Display availability list with edit and delete options */}
        <div className="md:w-1/2 w-full bg-gray-100 p-6 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Your Availability</h3>
          {availabilityList.length > 0 ? (
            <ul role="list" className="divide-y divide-gray-200">
              {availabilityList.map((slot, index) => (
                <li key={index} className="flex justify-between items-center py-2">
                  <div className="flex space-x-12">
                    <span className="text-sm text-gray-600">
                      Date: {new Date(slot.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="text-sm text-gray-600">Time: {slot.time}</span>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleDelete(slot._id)}
                      className="text-sm bg-red-400 text-white px-1 py-1 rounded hover:scale-105 duration-200 cursor-pointe"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No availability added yet.</p>
          )}
        </div>

        {/* Right Column: Form to add availability */}
        <div className="md:w-1/2 w-full bg-gray-100 p-6 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Add Availability</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold">Date:</label>
              <input
                type="date"
                name="date"
                value={availability.date}
                onChange={handleChange}
                required
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Time:</label>
              <input
                type="time"
                name="time"
                value={availability.time}
                onChange={handleChange}
                required
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-600 font-semibold"
            >
              Add Availability
            </button>
          </form>

          {/* Display any error messages */}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Availability;
