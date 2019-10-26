import React,{ useState } from 'react';

import './post-container.styles.scss';

import CommentFormContainer from '../comment-form-container/comment-form-container.component';
import LikeParticipantsCommentsContainer from '../LikeParticipantsCommentsContainer/LikeParticipantsCommentsContainer.component';
import CurrentUserContext from "../../contexts/current-user/current-user.context";


import utilsFunc from '../../utils/utilsFunc.js';
import CurrentPostContext from '../../contexts/current-post/current-post.context';

const PostContainer = () => {
  return (
    <CurrentPostContext.Consumer>
      {
        currentPost => {
          const {user: {firstName}, zipCode, post,createdAt}= currentPost;
          const postedTime = utilsFunc.getDuration(createdAt);
          return (
            <div key={currentPost._id} className="activity-card">
              <div className="user">
                <div className="profile-img">
                  <img className="profile-pic" src="/images/profile-picture-template.jpeg" alt="Profile Image" />
                </div>
                <h3>{firstName}</h3>
              </div>
              <p>{postedTime}</p>
              <div className="activity-description">
                <p className="activity-zipcode">"Activity" / {zipCode}</p>
                <p className="date-time">"Date / Time"</p>
              </div>
              <p className="post">{post}</p>
              <LikeParticipantsCommentsContainer currentPost={currentPost} />
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
              <CurrentUserContext.Consumer>
                {
                  user => user ? (
                    <CommentFormContainer />
                  ) : (
                    null
                  )
                }
              </CurrentUserContext.Consumer>
            </div>
          )
        }
      }
    </CurrentPostContext.Consumer>
  )
}

export default PostContainer;