import React from 'react';

/* import { FaCartPlus } from "react-icons/fa"; */
import logo from '../../Assets/logo.png';
 /* import './Navbar.css' */

const Navbar = () => {

  return (

    <nav className="navbar navbar-expand-lg fixed-top navbar-scroll">
  <div className="container">
    <img src={logo} alt='logo' height="30" loading="lazy" />
    <button className="navbar-toggler ps-0" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarExample01"
      aria-controls="navbarExample01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon d-flex justify-content-start align-items-center">
        <i class="fas fa-bars"></i>
      </span>
    </button>
    <div class="collapse navbar-collapse" id="navbarExample01">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item active">
          <a class="nav-link" aria-current="page" href="#news">News</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#pets">Pets</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#adoptions">Adoptions</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#foundation">Foundation</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#help">How can I help?</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#education">Education</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#about">About us</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#contact">Contact</a>
        </li>
      </ul>

     
    </div>
  </div>
</nav>
  );
}

export default Navbar;


