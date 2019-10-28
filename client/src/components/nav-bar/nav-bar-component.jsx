import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { Input } from '../Form/form.component';

import CurrentUserContext from '../../contexts/current-user/current-user.context.js';
import API from '../../utils/API';

import './nav-bar.styles.scss';

const NavBar = ({ addSearch, noOfNoti }) => {
  const [redirect, setRedirect] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => setRedirect(false),[redirect])
  
  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/' />
    }
  }

  const handleSignOut = () => {
    API.signOut().then(() => {
      setTimeout(() => window.location.reload(), 1000);
      localStorage.setItem('user', null);
    });
  }

  const handleInputChange = event => {
    setSearch(event.target.value);
  }

  const handleFormSubmit = event => {
    event.preventDefault();
    addSearch(search);
    setRedirect(!redirect);
  }

  return (
    <CurrentUserContext.Consumer>
      {
        user => (
          <div className="nav">
            {renderRedirect()}
            <div className="nav-header">
              <Link to="/home" className="nav-link">
                <div className="nav-title">
                  <img src="/images/Quattuor-logo.png" alt="Quattuor" />
                </div>
              </Link>
              {
                user ? (
                  <form className="search-form">
                    <Input 
                      className="search-input" 
                      type="text" 
                      placeholder="Search.." 
                      onChange={handleInputChange}
                    />
                    <button className="search-btn" onClick={handleFormSubmit}><i className="fa fa-search"></i></button>
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
                    <Link to={`/profile/${user ? user.user._id : null}`} className="nav-link"><i className="material-icons">person</i></Link>
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