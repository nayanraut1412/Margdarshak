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
       <div className="mt-10">
        <h1 className="">{role === 'mentor' ? <Mentor /> : <Mentee /> }</h1>
       </div> 
  );
};

export default Dashboard;
