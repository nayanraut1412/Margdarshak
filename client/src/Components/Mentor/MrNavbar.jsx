import React from 'react'
import { useState } from 'react';
import logo from '../../Assets/logo.png'
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

// import Availability from './MrHero';

// Logout function in a React component
import {useNavigate} from 'react-router-dom';
// import  {token}  from 'jwt-decode';


const Navbar = () => {
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate(); 

  const logout = () => {
    console.log('token while logouting');
    console.log(localStorage.getItem('token'));
    localStorage.removeItem('token'); 
    navigate('/signin'); 
  };


  const navItems = [
    {
      id: 1,
      text: "Home"
    },
    {
      id: 2,
      text: "Request"
    },
    {
      id: 3,
      text: "Availability"
    },
    {
      id: 4,
      text: " Completed Session"
    },
  ]
  return (
    <>
      <div className="max-w-screen-2xl bg-white container mx-auto px-4 md:px-20 h-16 shadow-md fixed top-0 left-0 right-0">
        <div className='flex justify-between items-center h-16'>

          <div>
            <img src={logo} alt='Logo' className='w-25' />
          </div>
          <div>
            <ul className='hidden md:flex space-x-8'>
              {
                navItems.map(({ id, text }) => (
                  <li className='hover:scale-105 duration-200 cursor-pointer py-1 text-lg' 
                  key={id}>
                  <Link to={text}>
                  {text}
                  </Link>
                  </li>
                  
                ))
              }
              <button onClick={logout} className="bg-red-400 text-white px-1 py-1 text-lg rounded hover:scale-105 duration-200 cursor-pointer "> Logout </button>
            </ul>
            <div onClick={() => setMenu(!menu)} className='md:hidden'>
              {menu ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
            </div>


          </div>
        </div>

        {/* modile Navbar */}
        {
          menu &&
          <div>
            <ul className='md:hidden flex flex-col h-screen items-center justify-center bg-red-300 space-y-3 text-xl'>
              {
                navItems.map(({ id, text }) => (
                  <li className='hover:scale-105 duration-200 font-semibold cursor-pointer' key={id}>{text}</li>
                ))
              }
              <button onClick={logout} className="bg-red-400 text-white px-1 py-1 text-lg rounded hover:scale-105 duration-200 cursor-pointer "> Logout </button>


            </ul>
          </div>
        }




      </div>

    </>

  )
}

export default Navbar