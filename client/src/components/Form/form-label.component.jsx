import React from "react";

import './form.styles.scss';

const Label = (props) => {
  return (
    <label {...props}>
      <div className="search-label-logo"></div>
    </label> 
  );
}

export default Label;
