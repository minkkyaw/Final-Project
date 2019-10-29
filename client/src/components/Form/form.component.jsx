import React, { useContext } from "react";

import './form.styles.scss';

import CurrentPostContext from '../../contexts/current-post/current-post.context';
import API from '../../utils/API';
import ReloadPostContext from '../../contexts/reload-post/reload-post.context';
import CurrentUserContext from '../../contexts/current-user/current-user.context.js'
import TogglePlaceDisplayContext from '../../contexts/toggle-place-display/toggle-place-display.context';

export const Input = (props) => {
  return (
    <div>
      <input {...props} />
    </div>
  );
};

export const Label = (props) => {
  return (
    <label {...props}>
      <div className="search-label-logo"></div>
    </label> 
  );
};

export const ContentEditableInput = ({children, handleInputChange, noChange, name}) => {
  const handleInputFocus = event => {
    if(!noChange)
    if(event.target.textContent === children) event.target.textContent='';
  };
  const handleBlur = event => {
    if(!event.target.textContent) event.target.textContent=`${children}`
  }
  return (
    <div className="input-wrapper">
      <div 
        name={name}
        className="contentEditable-input" 
        onInput={handleInputChange} 
        onFocus={handleInputFocus}  
        contentEditable="true" 
        onBlur={handleBlur}>{children}</div>
    </div>
  );
};

export const SubmitButton = ({children, content, place, zipCode, addPlaces}) => {
  const user = useContext(CurrentUserContext);
  let userId;
  if(user) userId = user.user._id;
  const reloadPost = useContext(ReloadPostContext);
  const togglePlaceDisplay = useContext(TogglePlaceDisplayContext);
  const handleFormSubmit = (event, postId, name, children) => {
    console.log(zipCode);
    event.preventDefault();
    if(content) {
      if(postId)         
        API.postComment(content, postId)
          .then(() => API.createNotifications(postId, userId ,{notification: `${name} commented on your post!`}))
          .then(()=> reloadPost())
          .catch(err => console.log(err));
      else 
        API.postPost(content,JSON.stringify(place),zipCode)
          .then(()=> reloadPost())
          .catch(err => console.log(err));
    } else if(!content && children === "Add a place") {
      togglePlaceDisplay();
    } else if(addPlaces) {
      addPlaces()
    }
    switch(children) {
      case "Post":
        return event.target.parentNode.parentNode.querySelector('.contentEditable-input').textContent = "Create a post";
      case "Search Places": 
        return ;
      case "Add a place":
        return;
      default:
        return event.target.parentNode.parentNode.querySelector('.contentEditable-input').textContent = "Add a comment";
    }
  }
  return (
    <CurrentPostContext.Consumer>
      {
        currentPost => {
          return children ? <button onClick={event => handleFormSubmit(event, null, null, children)} className="form-submit-btn">{children}</button>
            : <button onClick={event => handleFormSubmit(event, currentPost._id,currentPost.user.firstName, children)} className="form-submit-btn">
                <i className="material-icons">send</i>
              </button>
        }
      }
    </CurrentPostContext.Consumer>
  )
};



