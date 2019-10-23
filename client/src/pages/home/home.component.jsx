import React, { useState, useEffect } from 'react';

import Input from './../../components/Form/form-input.component';
import Label from './../../components/Form/form-label.component';
import PostsContainer from '../../components/posts-container/posts-container.component';

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
      <PostsContainer 
        posts={posts} 
        handleInputChange={handleInputChange} 
        handleFormSubmit={handleFormSubmit} 
        handleInputFocus={handleInputFocus}
      />
    </div>
  );
}

export default Home;