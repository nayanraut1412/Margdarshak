import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Mentee from '../Pages/Mentee';
import Mentor from '../Pages/Mentor';

 

const Dashboard = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded">
        <h1 className="text-2xl mb-4">Welcome, {role === 'mentor' ? <Mentor /> : <Mentee /> }!</h1>
      </div>
    </div>
  );
};

export default Dashboard;
