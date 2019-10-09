import React from 'react';

import NavItems from './../nav-items/nav-items.component';

import './nav-bar.styles.scss';

const navItems = [
  {
    name: 'Home',
    href: '/home'
  },
  {
    name: 'Tournament',
    href: '/tournament'
  },
  {
    name: 'Shop',
    href: '/Shop'
  },
  {
    name: 'Profile',
    href: '/profile'
  },
  {
    name: 'Log In',
    href: '/login/signin'
  }
]

const NavBar = () => (
  <div className="nav-bar">
    <h1 className="quattour-search-logo">Quattour</h1>
    <NavItems navItems={navItems}/>
  </div>
)

export default NavBar;