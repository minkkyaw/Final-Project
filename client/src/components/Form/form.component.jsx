import React from "react";

import './form.styles.scss';

import CurrentPostContext from '../../contexts/current-post/current-post.context';
import API from '../../utils/API';

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

export const ContentEditableInput = ({children, handleInputChange}) => {
  const handleInputFocus = event => {
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
  const handleFormSubmit = (event, id) => {
    event.preventDefault();
    console.log(content, id);
    if(id)         
      return API.postComment(content, id)
        .catch(err => console.log(err));
    else return API.postPost(content)
          .catch(err => console.log(err));
  }
  return (
    <CurrentPostContext.Consumer>
      {
        currentPost => {
          return children ? <button onClick={event => handleFormSubmit(event)} className="form-submit-btn">{children}</button>
            : <button onClick={event => handleFormSubmit(event, currentPost._id)} className="form-submit-btn">
                <i className="material-icons">send</i>
              </button>
        }
      }
    </CurrentPostContext.Consumer>
  )
};

