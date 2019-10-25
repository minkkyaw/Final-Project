import React from 'react';

import './post-form-container.styles.scss';

import { SubmitButton, ContentEditableInput } from '../form/form.component';

const PostFormContainer = props => {
  const {handleInputChange, handleInputFocus} = props
  return (
    <div className="post-container">
      <h4>Create Post</h4>
      <hr />
      <form className="contentEditable-input-btn-wrapper">
        <ContentEditableInput onInput={handleInputChange} onFocus={handleInputFocus} >Create a post</ContentEditableInput>
        <SubmitButton>Post</SubmitButton>
      </form>
    </div>
  )
}

export default PostFormContainer;