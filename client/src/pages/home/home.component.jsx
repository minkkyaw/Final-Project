import React, { useState, useEffect } from 'react';

import PostsContainer from '../../components/posts-container/posts-container.component';
import PostFormContainer from '../../components/post-form-container/post-form-container.component';
import PostsContext from '../../contexts/posts/posts.context';

import './home.styles.scss';
import API from '../../utils/API';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.setPost(setPosts);
  },[]);

  useEffect(() => {
    if(posts) console.log(posts);
  },[posts]);
  
  return (
    <div className="home-page-container">
      <div className="main-left-container">
        <div className="favorites-container">
          <h4><i className="material-icons">star</i> Favorites</h4>
        </div>
        <div className="reviews-container">
          <h4><i className="material-icons">thumb_up</i> Tournament Reviews</h4>
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
        <PostFormContainer />
        <PostsContext.Provider value={posts}>
          <PostsContainer />
        </PostsContext.Provider>
      </div>
    </div>
  );
}

export default Home;