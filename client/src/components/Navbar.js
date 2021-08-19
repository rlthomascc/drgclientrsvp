/* eslint-disable react/jsx-filename-extension */
import React from 'react';



const Navbar = () => {
  const nav = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light col-md" id="topNav">

      <img src="https://i.imgur.com/H3oD22B.gif" width="70px" />

      <ul className="nav flex-row navbar-nav mr-auto">
        <li className={window.location.href.charAt(window.location.href.length - 1) === '/' ? 'nav-item active' : 'nav-item'}>
          <a className={window.location.href.charAt(window.location.href.length - 1) === '/' ? 'nav-link text-success' : 'nav-link'} href="#">How it works</a>
        </li>
        <li className={window.location.href.includes('contact') ? 'nav-item active' : 'nav-item'}>
          <a className={window.location.href.includes('contact') ? 'nav-link text-success' : 'nav-link'} href="#/contact">Contact</a>
        </li>
      </ul>
      <ul className="nav flex-row navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link justify-content-end" id="contactNumber" href="tel:12092555830"><FaPhone className="text-success nav-icon" /></a>
        </li>

        <li className="nav-item">
          <a className="nav-link justify-content-end" id="contactNumber" href="sms:12092555830"><FaSms className="text-success nav-icon" /></a>
        </li>

        <li className="nav-item">
          <a className="nav-link justify-content-end" id="contactNumber" href="mailto:thehumblebuyers@gmail.com"><FaEnvelope className="text-success nav-icon" /></a>
        </li>
      </ul>
    </nav>
  );


  return (
    <div>
      {nav()}
    </div>
  );
};

export default Navbar;
