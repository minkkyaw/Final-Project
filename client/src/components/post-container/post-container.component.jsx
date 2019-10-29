import React,{ useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import './post-container.styles.scss';

import CommentFormContainer from '../comment-form-container/comment-form-container.component';
import LikeParticipantsCommentsContainer from '../LikeParticipantsCommentsContainer/LikeParticipantsCommentsContainer.component';
import CurrentUserContext from "../../contexts/current-user/current-user.context";


import { getDuration } from '../../utils/utilsFunc.js';
import CurrentPostContext from '../../contexts/current-post/current-post.context';
import ReloadPostContext from '../../contexts/reload-post/reload-post.context';
import API from '../../utils/API';

const PostContainer = () => {
  const reloadPost = useContext(ReloadPostContext);
  const currentUser= useContext(CurrentUserContext);
  const [redirect, setRedirect] = useState(false);
  const [redirectToUserCommented, setRedirectToUserCommented] = useState(false);
  const [userIdCommented, setUserIdCommented] = useState('');
  const renderRedirect = (id) => {
    if (redirect) {
      return <Redirect to={`/profile/${id}`} />
    }
  }

  const renderRedirectToUserCommented = () => {
    if (redirectToUserCommented) {
      return <Redirect to={`/profile/${userIdCommented}`} />
    }
  }

  const deletePost = async (id) => {
    try {
      const response = await API.deletePost(id);
      reloadPost();
    } catch(err) {
      console.log(err);
    }
  };

  const deleteComment = async (postId, commentId) => {
    try {
      await API.deleteComment(postId, commentId);
      reloadPost();
    } catch(err) {
      console.log(err);
    }
  };

  const handleRedirect = () => {
    setRedirect(true);
  };

  const handleRedirectToUserCommented = (id) => {
    setRedirectToUserCommented(true);
    setUserIdCommented(id);
  };

  return (
    <CurrentPostContext.Consumer>
      {
        currentPost => {
          const {user, zipCode, post,createdAt}= currentPost;
          const {firstName, photoUrl} = user;
          console.log(user);
          const postedTime = getDuration(createdAt);
          const postedDate = new Date(createdAt);
          const formattedDate = `${postedDate.getMonth() + 1}/${postedDate.getDate()}/${postedDate.getFullYear()}`;
          return (
            <div key={currentPost._id} className="activity-card">
              {renderRedirect(currentPost.user._id)}
              {renderRedirectToUserCommented()}
              <div className="user">
                <div className="profile-img">
                  <img className="profile-pic" src={ photoUrl ? `${photoUrl}`: "/images/profile-picture-template.jpeg"} alt="Profile" />
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
                <p className="activity-zipcode"><div id="activity-zipcode"><i id="location" class="material-icons">room</i> {zipCode}</div></p>
                <p className="date-time"><div id="date-time"><i id="date" class="material-icons">date_range</i> {formattedDate}</div></p>
              </div>
              <p className="post">{post}</p>
              <LikeParticipantsCommentsContainer />
              <div className="comments-wrapper">
                {
                  currentPost.comments? currentPost.comments.map((comment,i) => {
                    return (
                      <div key={i} className="comment-wrapper">
                        <div className="comment">
                          <p>
                            <span onClick={() => handleRedirectToUserCommented(comment.user._id)} className="user-commented">{comment.user.firstName}</span>
                            <span className="post-comment">{comment.comment}</span>
                          </p>
                          {
                            comment.user._id == currentUser.user._id ? 
                              <p className="delete-btn" onClick={()=>deleteComment(currentPost._id, comment._id)}>x</p>
                            : null
                          }
                        </div>
                        <p id="postedTime">{getDuration(comment.createdAt)}</p>
                      </div>
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