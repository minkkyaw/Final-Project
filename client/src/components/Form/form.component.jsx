import React, { useContext } from "react";

import './form.styles.scss';

import CurrentPostContext from '../../contexts/current-post/current-post.context';
import API from '../../utils/API';
import ReloadPostContext from '../../contexts/reload-post/reload-post.context';

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
  const reloadPost = useContext(ReloadPostContext);
  const handleFormSubmit = (event, id, children) => {
    event.preventDefault();
    if(content) {
      if(id)         
        API.postComment(content, id)
          .catch(err => console.log(err));
      else 
        API.postPost(content)
          .catch(err => console.log(err));
    }
    reloadPost();
    if(children === "Post")
      event.target.parentNode.parentNode.querySelector('.contentEditable-input').textContent = "Create a post";
    else event.target.parentNode.parentNode.querySelector('.contentEditable-input').textContent = "Add a comment";
  }
  return (
    <CurrentPostContext.Consumer>
      {
        currentPost => {
          return children ? <button onClick={event => handleFormSubmit(event, null, children)} className="form-submit-btn">{children}</button>
            : <button onClick={event => handleFormSubmit(event, currentPost._id, children)} className="form-submit-btn">
                <i className="material-icons">send</i>
              </button>
        }
      }
    </CurrentPostContext.Consumer>
  )
};



