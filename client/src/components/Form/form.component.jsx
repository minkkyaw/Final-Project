import React from "react";

import './form.styles.scss'

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

export const ContentEditableInput = ({children}, props) => {
  return (
    <div className="input-wrapper">
      <div className="contentEditable-input" {...props} contentEditable="true" onBlur={(event) => event.target.textContent=`Create a post`}>{children}</div>
    </div>
  );
};

export const SubmitButton = ({children}, props) => {
  return children ? <button className="form-submit-btn">{children}</button>
    : <button className="form-submit-btn"><i className="material-icons">send</i></button>
};

