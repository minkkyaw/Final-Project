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

export const ContentEditableInput = ({children, handleInputChange, noChange}) => {
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
        className="contentEditable-input" 
        onInput={handleInputChange} 
        onFocus={handleInputFocus}  
        contentEditable="true" 
        onBlur={handleBlur}>{children}</div>
    </div>
  );
};

export const SubmitButton = ({children, content}) => {

  const user = useContext(CurrentUserContext);
  const userId = user.user._id;
  const reloadPost = useContext(ReloadPostContext);
  const togglePlaceDisplay = useContext(TogglePlaceDisplayContext);
  const handleFormSubmit = (event, postId, name, children) => {
    event.preventDefault();
    if(content) {
      if(postId)         
        API.postComment(content, postId)
          .then(() => API.createNotifications(postId, userId ,{notification: `${name} commented on your post!`}))
          .catch(err => console.log(err));
      else 
        API.postPost(content)
          .catch(err => console.log(err));
      reloadPost();
    } else if(!content && children === "Add a place") {
      togglePlaceDisplay();
    }
    switch(children) {
      case "Post":
        return event.target.parentNode.parentNode.querySelector('.contentEditable-input').textContent = "Create a post";
      case "Add a place": 
        return ;
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



