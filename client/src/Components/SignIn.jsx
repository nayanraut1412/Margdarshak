
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
  );
};

export default SignIn;
