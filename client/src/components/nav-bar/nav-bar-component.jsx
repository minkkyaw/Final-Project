import React from 'react';

import NavItems from './../nav-items/nav-items.component';
import API from '../../utils/API';

import './nav-bar.styles.scss';

const NavBar = (props) => {
  const {user} = props;

  const handleSignOut = () => {
    API.signOut().then(() => {
      alert('Successfully Signed out!');
      setTimeout(() => window.location.reload(), 1000);
      localStorage.setItem('user', null);
    });
  }
  return (
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
      {
        user ? (
          <React.Fragment>
            <a href="/home" className="nav-link"><i className="material-icons">home</i></a>
            <a href="global-feed / home" className="nav-link"><i className="material-icons">public</i></a>
            <a href={`profile/${user ? user.user._id : null}`} className="nav-link"><i className="material-icons">person</i></a>
            <a href="tournaments" className="nav-link"><i className="material-icons">sports_kabaddi</i></a>
            <a href="/" className="nav-link" onClick={handleSignOut}>SIGN OUT</a>
          </React.Fragment>
        )
        :
          <a href="/login/signin" className="nav-link">SIGN IN</a>
      }
    </div>
  </div>
)}

export default NavBar;