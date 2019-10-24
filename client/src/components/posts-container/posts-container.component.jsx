import React from 'react';

import './posts-container.styles.scss';
import utilsFunc from '../../utils/utilsFunc.js';

const PostsContainer = (props) => {
  const {user, posts, handleInputChange, handleInputFocus} = props;
  return(
    <div className="post-container">
      <h4>Recent Activity</h4>
      <hr />
      {posts.length !== 0 ? posts.map((currPost, i) => {
        const {user: {firstName}, zipCode, post,createdAt}= currPost;
        const postedTime = utilsFunc.getDuration(createdAt);
        return (
          <div key={currPost._id} className="activity-card">
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
            <div className="like-people-joined-comment">
              <div className="label-amount-wrapper">
                <p className="post-label">Like</p>
                <p className="post-amount">0</p>
              </div>
              <div className="label-amount-wrapper">
                <p className="post-label">Participants</p>
                <p className="post-amount">0</p>
              </div>
              <div className="label-amount-wrapper">
                <p className="post-label">All comments</p>
                <p className="post-amount">0</p>
              </div>
            </div>
            <div className="comments-wrapper">
              {
                currPost.comments? currPost.comments.map((comment,i) => {
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
                <form className="comment-input-btn-wrapper">
                  <div className="input-wrapper">
                    <div className="comment-input" onInput={handleInputChange} contentEditable="true" onBlur={(event) => event.target.textContent="Add a comment"} onFocus={handleInputFocus} >Add a comment</div>
                  </div>
                  <button className="comment-btn"><i className="material-icons">send</i></button>
                </form>
              ) : (
                null
              )
            }
            
          </div>
        )
        } 
      ) : 
      (<h1>No Posts Found</h1>)  
      }
    </div>
  )
}

export default PostsContainer;