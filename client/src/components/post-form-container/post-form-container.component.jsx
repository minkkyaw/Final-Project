import React, { useState, useContext } from 'react';

import './post-form-container.styles.scss';

import { SubmitButton, ContentEditableInput } from '../Form/form.component';
import TogglePlaceDisplayContext from '../../contexts/toggle-place-display/toggle-place-display.context';
import API from '../../utils/API';

const PostFormContainer = () => {
  const [content, setContent] = useState('');
  const [placeDisplay, setPlaceDisplay] = useState(false);
  const [places, setPlaces] = useState([]);
  const [zipCode, setZipCode] = useState('');
  const [keyword, setKeyword] = useState('');
  const [place, setPlace] = useState(undefined)
  const togglePlaceDisplay = () => {
    setPlaceDisplay(!placeDisplay);
    setPlaces([]);
  };

  const addPlaces = () => 
    API.getPlaces(zipCode, keyword).then(response => setPlaces(response.data.results));
  
  const addPlace = (place) => {
    setPlace(place); setPlaceDisplay(!placeDisplay);
  };
  window.addEventListener('click', (event) => {
    if(event.target.className==="places-modal")
    setPlaceDisplay(false);
  })
  const handleInputChange = event => {
    switch(event.target.getAttribute("name")) {
      case "zipcode": 
        return setZipCode(event.target.textContent);
      case "keyword":
        return setKeyword(event.target.textContent);
      default:
        return setContent(event.target.textContent);
    }
  };
  console.log(zipCode);


  return (
    <div className="post-container">
      <h4>Create Post</h4>
      <hr />
      <form className="contentEditable-input-btn-wrapper">
        <ContentEditableInput handleInputChange={handleInputChange}>Create a post</ContentEditableInput>
        <SubmitButton place={place} zipCode={zipCode} content={content}>Post</SubmitButton>
        <TogglePlaceDisplayContext.Provider value={togglePlaceDisplay}>
          <SubmitButton>Add a place</SubmitButton>
        </TogglePlaceDisplayContext.Provider>
      </form>
      {
        placeDisplay ?
          <div className="places-modal">
            <div className="places-container">
              <div className="place-search-from">
                <ContentEditableInput name="zipcode" handleInputChange={handleInputChange}>Enter zipcode</ContentEditableInput>
                <ContentEditableInput name="keyword" handleInputChange={handleInputChange}>Enter keyword</ContentEditableInput>
                <SubmitButton addPlaces={addPlaces}>Search Places</SubmitButton>
              </div>
              {places.length > 0 ? 
                places.map((place, i) => {
                  const {link, name, formatted_address} = place
                  let addClass = "lightgrey";
                  if(i % 2 === 1) addClass = "grey";
                  return (
                    <div className={`${addClass} place-wrapper`}>
                      <h4 className="place-name">{name}</h4>
                      <p className="place-address">{formatted_address}</p>
                        <div className="links">
                          <a className="place-link" href={link} target="_blank">See Google Maps</a>
                          <a className="form-submit-button" onClick={()=> addPlace(place)}>Add To Post</a>
                        </div>
                    </div>
                )}) : <h4 className="no-place">No Places found</h4>}
            </div>
          </div>
          
        : null
      }
    </div>
  )
}

export default PostFormContainer;