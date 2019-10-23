import React from 'react';

import utilsFunc from '../../utils/utilsFunc.js'

const PostsContainer = (props) => {
  const {posts, handleInputChange, handleInputFocus} = props;
  return(
  <div className="post-container">
    <h4>Recent Activity</h4>
    <hr />
    {posts.length !== 0 ? posts.map((currPost, i) => {
      const {user: {firstName}, zipCode, post,createdAt}= currPost;
      const postedTime = utilsFunc.getDuration(createdAt);
      return (
        <div className="activity-card">
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
          <form className="action-form">
            <input className="home-user-action-btn" type="submit" value="COUNT ME IN" />
            <input className="home-user-action-btn" type="submit" value="MAYBE" />
            <input className="home-user-action-btn"type="submit" value="JOIN WAITLIST" />
          </form>
          <form className="comment-form">
            <label for="comment" className="comment-label">
              Start a chat:
            </label>
            <div className="comment-input-btn-wrapper">
              <div className="input-wrapper">
                <div className="comment-input" onInput={handleInputChange} contentEditable="true" onBlur={(event) => event.target.textContent="Say a comment"} onFocus={handleInputFocus} >Say a comment</div>
              </div>
              <button className="comment-btn"><i className="material-icons">send</i></button>
            </div>
          </form>
        </div>
      )
      } 
    ) : 
    (<h1>No Posts Found</h1>)  
    }
  </div>)
}

export default PostsContainer;