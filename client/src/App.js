import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home.jsx';

function App() {
  return (
    <>
    <BrowserRouter>
     
       <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/Home' element={<Home />} />
       

       </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
