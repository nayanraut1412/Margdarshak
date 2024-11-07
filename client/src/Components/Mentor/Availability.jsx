

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './MrNavbar';

const backendUrl = process.env.REACT_APP_API_URL_PRODUCTION;

const MentorAvailability = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [availabilityList, setAvailabilityList] = useState([]);
  const [error, setError] = useState(null);
  const [editingSlot, setEditingSlot] = useState(null); 

  const fetchAvailability = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${backendUrl}/api/availability/mentor`, {
        headers: { Authorization: token },
      });
      setAvailabilityList(response.data);
    } catch (error) {
      setError('Failed to fetch availability');
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${backendUrl}/api/availability/add`,
        { date, time },
        { headers: { Authorization: token } }
      );
      setAvailabilityList([...availabilityList, response.data]);
      setDate('');
      setTime('');
    } catch (error) {
      setError('Failed to add availability');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${backendUrl}/api/availability/${id}`, {
        headers: { Authorization: token },
      });
      setAvailabilityList(availabilityList.filter((slot) => slot._id !== id));
    } catch (error) {
      setError('Failed to delete slot');
    }
  };

  // Handle the slot edit
  const handleEdit = (slot) => {
    setEditingSlot(slot); // Set the slot being edited
    setDate(slot.date.slice(0, 10)); // Set date for editing
    setTime(slot.time); // Set time for editing
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${backendUrl}/api/availability/${editingSlot._id}`,
        { date, time },
        { headers: { Authorization: token } }
      );
      const updatedSlot = response.data;
      setAvailabilityList(availabilityList.map(slot =>
        slot._id === updatedSlot._id ? updatedSlot : slot
      ));
      setEditingSlot(null); // Clear the editing state
      setDate('');
      setTime('');
    } catch (error) {
      setError('Failed to update slot');
    }
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-20 ">
        <h2 className="text-2xl font-semibold mb-4 text-center">Manage Your Availability</h2>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1: Add Availability */}
          <div className="bg-white p-6 rounded shadow w-full max-w-md mx-auto">
  <h3 className="text-2xl font-semibold mb-6 text-center">Add or Edit Slot</h3>
  <div className="flex flex-col space-y-4">
    <div className="flex flex-col">
      <label htmlFor="date" className="font-medium text-gray-700">Date</label>
      <input
        type="date"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border rounded p-2 mt-2 w-full"
      />
    </div>
    <div className="flex flex-col">
      <label htmlFor="time" className="font-medium text-gray-700">Time</label>
      <input
        type="time"
        id="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border rounded p-2 mt-2 w-full"
      />
    </div>
    {/* If editing, show 'Save' button */}
    <div className="flex justify-center">
      {editingSlot ? (
        <button
          onClick={handleSaveEdit}
          className="bg-green-500 text-white px-6 py-2 rounded w-full md:w-auto mt-4"
        >
          Save Changes
        </button>
      ) : (
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-6 py-2 rounded w-full md:w-auto mt-4"
        >
          Add Slot
        </button>
      )}
    </div>
  </div>
</div>

  
          {/* Column 2: Availability List */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-2xl font-semibold mb-6 text-center">Your Availability</h3>
            {error && <p className="text-red-500">{error}</p>}
            <ul className="space-y-2">
              {availabilityList.map((slot) => (
                <li key={slot._id} className="flex justify-between items-center bg-gray-100 p-4 rounded">
                  {/* <span>{new Date(slot.date).toLocaleDateString()} - {slot.time}</span> */}
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
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(slot)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(slot._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  ); 
};

export default MentorAvailability;
