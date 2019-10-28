import React, { useState, useContext } from 'react';

import './post-form-container.styles.scss';

import { SubmitButton, ContentEditableInput } from '../Form/form.component';

const PostFormContainer = () => {
  const [content, setContent] = useState('');
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
        <SubmitButton content={content}>Add a place</SubmitButton>
      </form>
    </div>
  )
}

export default PostFormContainer;