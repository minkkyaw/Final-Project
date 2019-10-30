import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';

import PostsContainer from '../../components/posts-container/posts-container.component';
import PostFormContainer from '../../components/post-form-container/post-form-container.component';
import PostsContext from '../../contexts/posts/posts.context';
import AdsContainer from '../../components/ads-container/ads-container.component';

import './home.styles.scss';
import API from '../../utils/API';
import PostsProvider from '../../provider/posts.provider';
import ReloadPostContext from '../../contexts/reload-post/reload-post.context';

const Home = ({search, addSearch, redirect}) => {
  console.log(redirect);
  const [posts, setPosts] = useState([]);
  const [reloadPostCheck, setReloadPostCheck] = useState(false);
  const reloadPost = () => {console.log(1);setReloadPostCheck(!reloadPostCheck)};
  useEffect(() => {
    if(search) {
      API.searchPosts(search)
        .then(response => setPosts(response.data.data.data));
    }
    else API.setPost(setPosts);
  },[search,reloadPostCheck]);

  useEffect(() => {
    if(posts) console.log(posts);
  },[posts]);

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/login/signin' />
    }
  }
  
  return (
    <ReloadPostContext.Provider value={reloadPost} >
      {setTimeout(() => renderRedirect(),1000)}
      <div className="home-page-container">
        <div className="home-left-container">
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
          <PostsProvider>
            <PostFormContainer />
            <PostsContext.Provider value={posts}>
              <PostsContainer />
            </PostsContext.Provider>
          </PostsProvider>
        </div>
        <AdsContainer />
      </div>
    </ReloadPostContext.Provider>
  );
}

export default Home;