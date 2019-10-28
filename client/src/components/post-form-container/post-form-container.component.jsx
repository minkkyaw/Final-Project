import React, { useState, useContext } from 'react';

import './post-form-container.styles.scss';

import { SubmitButton, ContentEditableInput } from '../Form/form.component';
import ReloadPostContext from '../../contexts/reload-post/reload-post.context';
import TogglePlaceDisplayContext from '../../contexts/toggle-place-display/toggle-place-display.context';
import API from '../../utils/API';

const PostFormContainer = () => {
  const [content, setContent] = useState('');
  const [placeDisplay, setPlaceDisplay] = useState(false);
  const [places, setPlaces] = useState([]);
  const togglePlaceDisplay = () => {
    setPlaceDisplay(!placeDisplay);
    API.getPlaces().then(response => setPlaces(response.data.results))
  };
  window.addEventListener('click', (event) => {
    if(event.target.textContent && event.target.textContent!=="Add a place")
    setPlaceDisplay(false);
  })
  const handleInputChange = event => {
    setContent(event.target.textContent);
  };

  return (
    <div className="post-container">
      <h4>Create Post</h4>
      <hr />
      <form className="contentEditable-input-btn-wrapper">
        <ContentEditableInput handleInputChange={handleInputChange}>Create a post</ContentEditableInput>
        <SubmitButton content={content}>Post</SubmitButton>
        <TogglePlaceDisplayContext.Provider value={togglePlaceDisplay}>
          <SubmitButton>Add a place</SubmitButton>
        </TogglePlaceDisplayContext.Provider>
      </form>
      <div className="places-modal">
        <div className="places-container">
          {
            placeDisplay ?
              places.length > 0 ? 
                places.map(({link, name, formatted_address}) => (
                  <a href={link} target="_blank">
                    <h4>{name}</h4>
                    <p>{formatted_address}</p>
                  </a>
                ))
              : <h4>No Places found</h4>
            : null
          }
        </div>
      </div>
    </div>
  )
}

export default PostFormContainer;