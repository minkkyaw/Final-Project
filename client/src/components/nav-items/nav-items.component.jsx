import React from 'react';

import './nav-items.styles.scss';

const NavItems = ({ handleFunction, navItems, action, book, view}) => {
  return (
    <div className="nav-items-button-groups">
      { navItems.map((navItem, i) => (
          <a
            key={i}
            className="nav-item-btn"
            href={`${navItem.href ? navItem.href: ""}`}
            rel="noopener noreferrer"
          >
            {navItem.name}
          </a> 
        ))
      }   
      </div>
  )
}

export default NavItems;