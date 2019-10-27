import React, { useState, useEffect } from 'react';

import PostsContainer from '../../components/posts-container/posts-container.component';
import PostFormContainer from '../../components/post-form-container/post-form-container.component';
import PostsContext from '../../contexts/posts/posts.context';
import AdsContainer from '../../components/ads-container/ads-container.component';

import './profile.styles.scss';
import API from '../../utils/API';

const Profile = props => {
  const [postToPost, setPostToPost] = useState('');
  const [posts, setPosts] = useState([]);
  const [postComment, setPostComment] = useState('');
  const [search, setSearch] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');
  const [firstName, setFirstName] = useState('First');
  const [lastName, setLastName] = useState('Last');
  const [city, setCity] = useState('city');
  const [zipCode, setZipCode] = useState('zipcode');
  const [phone, setPhone] = useState('123-456-7890');
  useEffect(() => {
    API.getUserWithPosts(props.match.params.id)
      .then(response => {
        const {firstName, lastName, city, zipCode, posts} = response.data.data.data;
        setFirstName(firstName);
        setLastName(lastName);
        setCity(city);
        setZipCode(zipCode);
        setPosts(posts);
      })
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
      <div className="main-left-container">
        <div className="user-container">
            <div className="user-image">
              <img className="profile-pic" src="/images/profile-picture-template.jpeg" alt="Profile Image" />
            </div>
            <div className="user-info-container">
              <h2>{`${firstName} ${lastName}`}</h2>
              <div className="user-info">
                <p><i className="material-icons">sports</i> Basketball, Golf</p>
                <p><i className="material-icons">home</i>{`${city} ${zipCode}`}</p>
                <p><i className="material-icons">smartphone</i>{phone}</p>
              </div>
              <hr />
              <div className="skills-container">
                <h3>Skills</h3>
                <p>Shooting</p>
                <div className="skills-bar">
                    <div className="skill one">90%</div>
                </div>

                <p>Dunking</p>
                <div className="skills-bar">
                    <div className="skill two">80%</div>
                </div>

                <p>Long Range Golf</p>
                <div className="skills-bar">
                    <div className="skill three">65%</div>
                </div>

                <p>Driving</p>
                <div className="skills-bar">
                    <div className="skill four">60%</div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div className="main-center-container">
        <PostFormContainer handleInputChange={handleInputChange} handleInputFocus={handleInputFocus} />
        <PostsContext.Provider value={posts}>
          <PostsContainer />
        </PostsContext.Provider>
      </div>
      <AdsContainer />
    </div>
  );
}

export default Profile;