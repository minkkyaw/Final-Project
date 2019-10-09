import React from 'react';

import NavItems from './../nav-items/nav-items.component';

import './nav-bar.styles.scss';

const NavBar = (props) => (
  <div className={props.className}>
    <h1 className="quattour-logo">{props.children}</h1>
    <NavItems navItems={props.navItems}/>
  </div>
)

export default NavBar;