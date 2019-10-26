import React, { useState } from 'react';

import './post-form-container.styles.scss';

import { SubmitButton, ContentEditableInput } from '../form/form.component';
import CurrentContentContext from '../../contexts/current-content/current-content.context';

const PostFormContainer = () => {
  const [content, setContent] = useState('');
  const handleInputChange = event => {
    setContent(event.target.textContent);
    console.log(event.target.textContent);
  };

  return (
    <div className="post-container">
      <h4>Create Post</h4>
      <hr />
      <form className="contentEditable-input-btn-wrapper">
        <ContentEditableInput handleInputChange={handleInputChange}>Create a post</ContentEditableInput>
        <SubmitButton content={content}>Post</SubmitButton>
      </form>
    </div>
  )
}

export default PostFormContainer;