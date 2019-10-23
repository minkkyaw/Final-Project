import React, { useState, useEffect } from 'react';

import Input from './../../components/Form/form-input.component';
import Label from './../../components/Form/form-label.component';

import './home.styles.scss';
import API from '../../utils/API';
import utilsFunc from '../../utils/utilsFunc.js'



const Home = () => {
  const [postToPost, setPostToPost] = useState('');
  const [posts, setPosts] = useState([]);
  const [postComment, setPostComment] = useState('');
  const [search, setSearch] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');

  useEffect(() => {
    API.setPost(setPosts);
  },[]);

  useEffect(() => {
    if(posts) console.log(posts);
  },[posts]);

  const handleInputChange = event => {
    switch(event.target.name) {
      case ('post'): 
        return setPostToPost(event.target.value);
      case ('search'): 
        return setSearch(event.target.value);
      default: 
        return setPostComment(event.target.textContent);
    }
  }

  const handleInputFocus = event => {
    event.target.textContent = '';
  }
  
  const handleFormSubmit = (event, postId) => {
    event.preventDefault();
    switch(event.target.name) {
      case('post'): 
        return API.postPost(postToPost)
          .then(res=> setPostToPost(''))
          .then(() => API.setPost(setPosts, currentSearch? currentSearch: null))
          .catch(err => console.log(err));
      case('comment'): 
        return API.postComment(postComment, event.target.getAttribute('data-postId'))
        .then(res=> {
          setPostComment('');
          document.querySelector('.comment-input').textContent = 'Say a comment';
        })
        .then(() => API.setPost(setPosts, currentSearch? currentSearch: null))
        .catch(err => console.log(err));
      case('like'): 
        return API.likePost(event.target.getAttribute('data-postId'), event.target.getAttribute('data-userLiked'))
          .then(res=> setPostComment(''))
          .then(() => API.setPost(setPosts, currentSearch? currentSearch: null))
          .catch(err => console.log(err));
      case('search'): 
        return API.searchPosts(search)
          .then(res=> {
            setCurrentSearch(search);
            setPosts(res.data.data.data);
          })
          .catch(err => console.log(err));
      default:
        return null;
    }
  }
  return (
    <div className="home-page-container">
      <div class="main-left-container">
        <div class="favorites-container">
          <h4><i class="material-icons">star</i> Favorites</h4>
        </div>
        <div class="reviews-container">
          <h4><i class="material-icons">thumb_up</i> Tournament Reviews</h4>
        </div>
      </div>
      {/* <form className="home-search-form">
        <Input 
          className="post-input form-input form-inherit"
          onChange={handleInputChange}
          name="post"
          type="text"
          value={postToPost ? postToPost: undefined}
          placeholder="What is your plan?"
          />
        <Input 
          className="form-btn form-inherit"
          onClick={handleFormSubmit}
          name="post"
          type="submit"
          value="Post"
        />
      </form> */}
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
      </div>
    </div>
  );
}

export default Home;