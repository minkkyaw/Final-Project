import React from 'react';

import NavItems from './../nav-items/nav-items.component';

import './nav-bar.styles.scss';

const NavBar = (props) => (
  <div className="nav">
    <div className="nav-header">
      <div className="nav-title">
        <img src="./images/Quattuor-logo.png" />
      </div>
      <form className="search-form">
        <input className="search-input" type="text" placeholder="Search.." name="search" />
        <button className="search-btn"><i className="fa fa-search"></i></button>
      </form>
    </div>
    <div className="nav-links">
      <a href="/home" className="nav-link"><i className="material-icons">home</i></a>
      <a href="global-feed / home" className="nav-link"><i className="material-icons">public</i></a>
      <a href="profile" className="nav-link"><i className="material-icons">person</i></a>
      <a href="tournaments" className="nav-link"><i className="material-icons">sports_kabaddi</i></a>
      <a href="contact" className="nav-link"><i className="material-icons">contact_support</i></a>
    </div>
  </div>
)

export default NavBar;