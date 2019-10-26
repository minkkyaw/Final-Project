import React, { useState } from 'react';

import './comment-form-component.styles.scss';

import { SubmitButton, ContentEditableInput } from '../Form/form.component';

const CommentFormContainer = () => {
  const [content, setContent] = useState('');
  const handleInputChange = event => {
    setContent(event.target.textContent);
  };
  return (
    <form className="contentEditable-input-btn-wrapper">
      <ContentEditableInput handleInputChange={handleInputChange}>Add a comment</ContentEditableInput>
      <SubmitButton content={content} send />
    </form>
  )
}

export default CommentFormContainer;