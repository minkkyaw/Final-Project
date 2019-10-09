import React from "react";

import './form.styles.scss'

// This file exports the Input, TextArea, and FormBtn components

// const Label = (props) => {
//   return (
//     <label {...props}>
//       <div className="search-label-logo"></div>
//     </label>
//   );
// }

export const Input = (props) => {
  return (
    <div>
      <input {...props} />
    </div>
  );
}

