import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home.jsx';
import SignUp from './Components/SignUp.jsx';

import SignIn from './Components/SignIn.jsx';
// import SignUp from './Components/SignUp.jsx';
import Dashboard from './Components/Dashboard.jsx';

import MenteeHome from './Components/Mentee/MenteeHero.jsx';
import MenteeBooking from './Components/Mentee/FindMentor.jsx';

import Request from './Components/Mentor/Request.jsx';
import MentorHome from './Components/Mentor/MentorHome.jsx';
import Availability from './Components/Mentor/Availability.jsx';

function App() {
  return (
    <>
    <BrowserRouter>
     
       <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
         {/* Mentee Routes */}
        <Route exact path="/menteehome" element={<MenteeHome />} />
        <Route exact path="/menteebooking" element={<MenteeBooking />} />

        {/* Mentor Routes */}
        <Route exact path="/mentorhome" element={<MentorHome />} />
        <Route exact path="/request" element={<Request />} />
        <Route exact path="/availability" element={<Availability />} />

       

       </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
