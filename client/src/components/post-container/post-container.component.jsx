import React,{ useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import './post-container.styles.scss';

import CommentFormContainer from '../comment-form-container/comment-form-container.component';
import LikeParticipantsCommentsContainer from '../LikeParticipantsCommentsContainer/LikeParticipantsCommentsContainer.component';
import CurrentUserContext from "../../contexts/current-user/current-user.context";


import utilsFunc from '../../utils/utilsFunc.js';
import CurrentPostContext from '../../contexts/current-post/current-post.context';
import API from '../../utils/API';

const PostContainer = () => {
  const currentUser= useContext(CurrentUserContext);
  const [redirect, setRedirect] = useState(false);
  const renderRedirect = (id) => {
    if (redirect) {
      return <Redirect to={`/profile/${id}`} />
    }
  }

  const deletePost = async (id) => {
    try {
      const response = await API.deletePost(id);
      alert("Successfully deleted");
    } catch(err) {
      console.log(err);
    }
  };

  const handleRedirect = () => {
    setRedirect(true);
  };

  return (
    <CurrentPostContext.Consumer>
      {
        currentPost => {
          const {user: {firstName}, zipCode, post,createdAt}= currentPost;
          const postedTime = utilsFunc.getDuration(createdAt);
          const postedDate = new Date(createdAt);
          const formattedDate = `${postedDate.getMonth() + 1}/${postedDate.getDate()}/${postedDate.getFullYear()}`;
          return (
            <div key={currentPost._id} className="activity-card">
              {renderRedirect(currentPost.user._id)}
              <div className="user">
                <div className="profile-img">
                  <img className="profile-pic" src="/images/profile-picture-template.jpeg" alt="Profile Image" />
                </div>
                <h3 onClick={handleRedirect} className="post-user-firstname">{firstName}</h3> <p id="postedTime">{postedTime}</p>
                {
                  currentUser.user._id == currentPost.user._id ? 
                    <p className="delete-btn" onClick={()=>deletePost(currentPost._id)}>x</p>
                  : null
                }
              </div>
              {/* <p id="postedTime">{postedTime}</p> */}
              <div className="activity-description">
                <p className="activity-zipcode">Zipcode - {zipCode}</p>
                <p className="date-time">Date - {formattedDate}</p>
              </div>
              <p className="post">{post}</p>
              <LikeParticipantsCommentsContainer />
              <div className="comments-wrapper">
                {
                  currentPost.comments? currentPost.comments.map((comment,i) => {
                    return (
                      <React.Fragment>
                        <div key={i} className="comment-wrapper">
                          <div className="comment">
                            <span className="user-commented">{comment.user.firstName}</span>
                            <span className="post-comment">{comment.comment}</span>
                          </div>
                          <p id="postedTime">{utilsFunc.getDuration(comment.createdAt)}</p>
                        </div>
                      </React.Fragment>
                      );
                  })
                  :
                  null
                }
              </div>
                {
                  currentUser ? (
                    <CommentFormContainer />
                  ) : (
                    null
                  )
                }
            </div>
          )
        }
      }
    </CurrentPostContext.Consumer>
  )
}

export default PostContainer;