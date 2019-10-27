import React, { useState, useEffect } from 'react';

import PostsContainer from '../../components/posts-container/posts-container.component';
import PostFormContainer from '../../components/post-form-container/post-form-container.component';
import PostsContext from '../../contexts/posts/posts.context';
import AdsContainer from '../../components/ads-container/ads-container.component';
import UserProfileContainer from '../../components/user-profile-container/user-profile-container.component';
import PostsProvider from '../../provider/posts.provider';
import { PostsFromProviderContext } from '../../provider/posts.provider';
import './profile.styles.scss';
import API from '../../utils/API';

const Profile = props => {
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    zipCode: '',
    posts: [],
  });

  useEffect(() => {
    API.getUserWithPosts(props.match.params.id)
      .then(response => {
        setUserData(response.data.data.data)
        setPosts(response.data.data.data.posts)
      })
  },[]);

  useEffect(() => {
    if(posts) console.log(posts);
  },[posts]);

  return (
    <div className="profile-page-container">
      <div className="main-left-container">
        <UserProfileContainer userData={userData} />
      </div>
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
  );
}

export default Profile;