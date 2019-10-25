import React from 'react';

import './comment-form-component.styles.scss';

import { SubmitButton, ContentEditableInput } from '../form/form.component';

const CommentFormContainer = props => {
  const {handleInputChange, handleInputFocus} = props
  return (
    <form className="contentEditable-input-btn-wrapper">
      <ContentEditableInput onInput={handleInputChange} onFocus={handleInputFocus} >Add a comment</ContentEditableInput>
      <SubmitButton send />
    </form>
  )
}

export default CommentFormContainer;