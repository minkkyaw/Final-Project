import React from 'react';

import './post-container.styles.scss';

import CommentFormContainer from '../comment-form-container/comment-form-container.component';
import LikeParticipantsCommentsContainer from '../LikeParticipantsCommentsContainer/LikeParticipantsCommentsContainer.component';

import utilsFunc from '../../utils/utilsFunc.js';

const PostContainer = (props) => {
  const {user, currentPost, handleInputChange, handleInputFocus} = props;
  const {user: {firstName}, zipCode, post,createdAt}= currentPost;
  const postedTime = utilsFunc.getDuration(createdAt);
  return (
    <div key={currentPost._id} className="activity-card">
      <div className="user">
        <div className="profile-img"></div>
        <h3>{firstName}</h3>
      </div>
      <p>{postedTime}</p>
      <div className="activity-description">
        <p className="activity-zipcode">"Activity" / {zipCode}</p>
        <p className="date-time">"Date / Time"</p>
      </div>
      <p className="post">{post}</p>
      <LikeParticipantsCommentsContainer />
      <div className="comments-wrapper">
        {
          currentPost.comments? currentPost.comments.map((comment,i) => {
            return (
              <div key={i} className="comment-wrapper">
                <div className="comment">
                  <span className="user-commented">{comment.user.firstName}</span>
                  <span className="post-comment">{comment.comment}</span>
                </div>
                <p>{utilsFunc.getDuration(comment.createdAt)}</p>
              </div>
              );
          })
          :
          null
        }
      </div>
      {
        !user ? (
          <CommentFormContainer handleInputChange={handleInputChange} handleInputFocus={handleInputFocus} />
        ) : (
          null
        )
      }
      
    </div>
  )
}

export default PostContainer;