import React, { useState, useEffect } from 'react';

import Input from './../../components/Form/form-input.component';
import Label from './../../components/Form/form-label.component';
import PostsContainer from '../../components/posts-container/posts-container.component';

import './profile.styles.scss';
import API from '../../utils/API';
import utilsFunc from '../../utils/utilsFunc.js'



const Profile = () => {
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
    <div className="profile-page-container">
      <div class="main-left-container">
            <div class="user-container">
                <div class="user-image">
                    <img class="profile-pic" src="images/download.jpeg" />
                </div>
                <div class="user-info-container">
                    <h2>Lebron James</h2>
                    <div class="user-info">
                        <p><i class="material-icons">sports</i> Basketball, Golf</p>
                        <p><i class="material-icons">home</i> 19152</p>
                        <p><i class="material-icons">smartphone</i> 123-456-7890</p>
                    </div>
                    <hr />
                    <div class="skills-container">
                        <h3>Skills</h3>
                        <p>Shooting</p>
                        <div class="skills-bar">
                            <div class="skill one">90%</div>
                        </div>

                        <p>Dunking</p>
                        <div class="skills-bar">
                            <div class="skill two">80%</div>
                        </div>

                        <p>Long Range Golf</p>
                        <div class="skills-bar">
                            <div class="skill three">65%</div>
                        </div>

                        <p>Driving</p>
                        <div class="skills-bar">
                            <div class="skill four">60%</div>
                        </div>
                    </div>
                </div>
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
      <PostsContainer 
        posts={posts} 
        handleInputChange={handleInputChange} 
        handleFormSubmit={handleFormSubmit} 
        handleInputFocus={handleInputFocus}
      />
    </div>
  );
}

export default Profile;