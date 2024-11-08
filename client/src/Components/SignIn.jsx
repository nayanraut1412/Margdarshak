
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Navbar from './LandingPage/Navbar';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const backendUrl = process.env.REACT_APP_API_URL;

const SignIn = () => {

  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Environment Variables:", process.env);
      console.log("Backend URL from .env:", backendUrl);


      const res = await axios.post(`${backendUrl}/api/auth/login`, formData);
      toast.success('Signin successful! Redirecting to Dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);

      localStorage.setItem('token', res.data.token);
      console.log(localStorage.getItem('token'));
  
    } catch (err) {
      const errorMessage = err.response && err.response.data ? err.response.data.error : 'Login failed';
      alert(errorMessage); 
    
      console.log(err);
    }
  };

  return (
    <>
    <Navbar />
    <div className="container mx-auto">
    <ToastContainer
      position="top-right"
      autoClose={3000}           // Auto close after 3 seconds
      hideProgressBar={false}     // Show or hide the progress bar
      closeOnClick                // Close on click
      pauseOnHover                // Pause on hover
      draggable   
      transition={Slide}  
      className="mt-14"                // Allow drag-to-close
    />

    <div name="SignIn" className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl mb-4">Sign In</h2>
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Sign In</button>
      </form>
    </div>
    </div>
    </>
  );
};

export default SignIn;
