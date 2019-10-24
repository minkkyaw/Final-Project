import React, { useState, useEffect } from 'react';

import Input from './../../components/Form/form-input.component';
import Label from './../../components/Form/form-label.component';
import PostsContainer from '../../components/posts-container/posts-container.component';

import './home.styles.scss';
import API from '../../utils/API';



const Home = (props) => {
  const [postToPost, setPostToPost] = useState('');
  const [posts, setPosts] = useState([]);
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
        return ;
    }
  }
  const handleInputFocus = event => {
    event.target.textContent = '';
  }
  
  const handleFormSubmit = (event, postId) => {
    event.preventDefault();
    switch(event.target.name) {
      case('search'): 
        return API.searchPosts(search)
          .then(res=> {
            setCurrentSearch(search);
            setPosts(res.data.data.data);
          })
          .catch(err => console.log(err));
      case('post'): 
        return API.postPost(postToPost)
          .then(res=> setPostToPost(''))
          .then(() => API.setPost(setPosts, currentSearch? currentSearch: null))
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
      <div className="main-center-container">
        <div className="post-container">
          <h4>Create Post</h4>
          <hr />
          <form className="comment-input-btn-wrapper">
            <div className="input-wrapper">
              <div className="comment-input" onInput={handleInputChange} contentEditable="true" onBlur={(event) => event.target.textContent="Add a comment"} onFocus={handleInputFocus} >Create a post</div>
            </div>
            <button className="comment-btn">Post</button>
          </form>
        </div>
        <PostsContainer 
          posts={posts} 
          user={props.user ? props.user : null}
          handleInputChange={handleInputChange} 
          handleFormSubmit={handleFormSubmit} 
          handleInputFocus={handleInputFocus}
        />
      </div>
    </div>
  );
}

export default Home;