import React from 'react';

import NavItems from './../nav-items/nav-items.component';

import './book-details.styles.scss';


const BookDetails = (props) => {
  const { title, authors, description, thumbnail , infoLink } = props.book;
  const navItems = [
    {
      name: 'View',
      href: infoLink
    }
  ];

  return (
    <div className="book-wrapper">
      <div className="book-navbar">
        <h2 className="book-title">{title}</h2>
        <NavItems book={JSON.stringify(props.book)} navItems={navItems} handleFunction={props.handleFunction} action={props.action} view/>
      </div>
      <div className="details-wrapper">
        <h3 className="book-authors">{authors}</h3>
        <div className="description-img-wrapper">
          <img className="book-image" src={thumbnail} alt={title} />
           <p>{description}</p>
        </div>
        <a href={infoLink} target="_blank" rel="noopener noreferrer">Click here to buy</a>
      </div>
    </div>
  )
}

export default BookDetails;