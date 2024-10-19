import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home.jsx';
import SignUp from './Components/SignUp.jsx';

import SignIn from './Components/SignIn.jsx';
// import SignUp from './Components/SignUp.jsx';

import Dashboard from './Components/Dashboard.jsx';

function App() {
  return (
    <>
    <BrowserRouter>
     
       <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/Home' element={<Home />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
       

       </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
