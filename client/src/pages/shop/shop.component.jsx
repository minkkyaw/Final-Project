import React from 'react';

import NavBar from './../../components/nav-bar/nav-bar-component';

import './shop.styles.scss';


const Shop = () => {
  const navItems = [
    {
      name: 'Sort'
    },
    {
      name: 'Filter'
    }
  ]
  return (
    <NavBar className="shop-nav-bar" navItems={navItems}>
      Shop
    </NavBar>
  );
}

export default Shop;