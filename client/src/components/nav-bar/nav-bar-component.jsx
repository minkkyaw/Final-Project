import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import CurrentUserContext from '../../contexts/current-user/current-user.context.js';
import API from '../../utils/API';

import './nav-bar.styles.scss';

const NavBar = () => {
  const handleSignOut = () => {
    API.signOut().then(() => {
      // alert('Successfully Signed out!');
      setTimeout(() => window.location.reload(), 1000);
      localStorage.setItem('user', null);
    });
  }
  return (
    <CurrentUserContext.Consumer>
      {
        user => (
          <div className="nav">
            <div className="nav-header">
              <div className="nav-title">
                <img src="/images/Quattuor-logo.png" alt="Quattuor" />
              </div>
              {
                user ? (
                  <form className="search-form">
                    <input className="search-input" type="text" placeholder="Search.." name="search" />
                    <button className="search-btn"><i className="fa fa-search"></i></button>
                  </form>
                )
                :
                  null
              }
            </div>
            <div className="nav-links">
              {
                user ? (
                  <React.Fragment>
                    <Link to="/home" className="nav-link"><i className="material-icons">home</i></Link>
                    <Link to="/home" className="nav-link"><i className="material-icons">public</i></Link>
                    <Link to={`profile/${user ? user.user._id : null}`} className="nav-link"><i className="material-icons">person</i></Link>
                    <Link to="/tournaments" className="nav-link"><i className="material-icons">sports_kabaddi</i></Link>
                    <Link to="/" className="nav-link" onClick={handleSignOut}>SIGN OUT</Link>
                  </React.Fragment>
                )
                :
                  <React.Fragment>
                    <Link to="/login/signin" className="nav-link">SIGN IN</Link>
                    <Link to="/login/signup" className="nav-link">SIGN UP</Link>
                  </React.Fragment>
              }
            </div>
          </div>
        )
      }
    </CurrentUserContext.Consumer>
   
  );
};

export default NavBar;