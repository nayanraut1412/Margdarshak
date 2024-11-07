import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './MeNavbar';
import { ReactTyped } from "react-typed";
import consultant from "../../Assets/consultant.png";

const backendUrl = process.env.REACT_APP_API_URL_PRODUCTION;


const Hero = () => {
    
  const [userName, setUserName] = useState('');
  const [, setError] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User not authenticated');
        }

        const response = await axios.get(`${backendUrl}/api/mentee/username`, {
          headers: { Authorization: `${token}` },
        });

        if (response.status === 200) {
          setUserName(response.data.username); 
        } else {
          setError('Failed to fetch user information');
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
        setError(error.response?.data?.message || 'Failed to load user data');
      }
    };

    fetchUserName();
  }, []);

  return (
    <>
     <Navbar/>
      <div className='max-w-screen-xl mx-auto my-5 px-4 md:px-20 py-20'>
      <div className="flex justify-center text-xl md:text-2xl gap-14 font-bold text-blue-700 text-center">
        <span>Cloud Computing CA-2 </span> 
        <span>Prn: 2146491245038</span>
        <span>Name: Nayan Raut</span> 
      </div>
        <div className='flex flex-col md:flex-row'>
          <div className='md:w-1/2 ml-8 mr-20 mt-0 md:mt-36 order-2 md:order-1'>
            <span className='text-2xl text-blue-700 font-bold'>Welcome, {userName}!</span>
            <div className='flex space-x-1 text-2xl md:text-3xl'>
              <h1>Your gateway to expert</h1>
              {/* <span className='text-blue-700 font-bold'>Skill Development</span> */}
              <ReactTyped
                className='text-blue-700 font-bold'
                // typedRef={setTyped}
                strings={["Skill Development", "Resume Building",  "Career Guidance"]}
                typeSpeed={40}
                backSpeed={50}
                loop={true}
              />
            </div>
            <br />
            <p className='text-sm md:text-md text-justify'>
              Mentor Connect is a platform designed to bridge the gap between aspiring professionals and experienced mentors. It offers personalized career guidance, skill development, resume building, and networking opportunities, helping individuals grow and succeed in their careers. Whether you're preparing for job interviews or looking to advance in your field, Mentor Connect provides the support you need to reach your goals.
            </p>
          </div>
          <div className='md:w-1/2 ml-48 md:mt-24 mt-8 order-1'>
            <img src={consultant} alt='Hero' className='sm:w-[300px] sm:h-[300px]' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero;