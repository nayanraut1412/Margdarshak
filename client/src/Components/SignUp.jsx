import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './LandingPage/Navbar';


const backendUrl = process.env.REACT_APP_API_URL;

const SignUp = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '',expertise:'', role: 'mentee' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post(`${backendUrl}/api/auth/register`, formData);
      toast.success('Signup successful! Redirecting to sign-in...');
      setTimeout(() => {
        navigate('/signin');
      }, 3000);

     
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container mx-auto">
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
    </div>

    <div name="SignUp" className="flex justify-center items-center min-h-screen bg-gray-100">
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="border p-2 w-full mb-4"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 w-full mb-4"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 w-full mb-4"
          required
        />
         <input
          type="expertise"
          name="expertise"
          placeholder="expertise"
          onChange={handleChange}
          className="border p-2 w-full mb-4"
          required
        />
        <select
          name="role"
          onChange={handleChange}
          className="border p-2 w-full mb-4"
          required
        >
          <option value="mentee">Mentee</option>
          <option value="mentor">Mentor</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Sign Up</button>
      </form>
    </div>
    
    </>
  );
};

export default SignUp;
