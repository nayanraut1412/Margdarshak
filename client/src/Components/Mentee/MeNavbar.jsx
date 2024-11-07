import React from 'react'
import { useState } from 'react';
import logo from '../../Assets/logo.png'
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate} from 'react-router-dom';


const Navbar = () => {
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate(); 

  const logout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/signin'); // Redirect the user to the SignIn page
  };


  const navItems = [
    {
      id: 1,
      text: "Home",
      path:"/MenteeHome"
    },
    {
      id: 2,
      text: "Book Slots",
      path:"/menteebooking"
    },
    {
      id: 3,
      text: "Build Resume ",
      path:"/MenteeHome"
    },
    {
      id: 4,
      text: "Completed session",
      path: "/MenteeHome"
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
                navItems.map(({ id, text, path }) => (
                  <li className='hover:scale-105 duration-200 cursor-pointer py-1 text-lg' 
                  key={id}>
                 <Link to={path}>{text}</Link>
                 
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
            <ul className='md:hidden flex flex-col h-screen items-center justify-center space-y-3 text-xl'>
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