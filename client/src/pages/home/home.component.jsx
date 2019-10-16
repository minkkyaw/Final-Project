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

  useEffect(() => {
    API.setPost(setPosts);
  },[])

  useEffect(() => {
    if(posts) console.log(posts.length === 0);
  },[posts])
  
  const handleFormSubmit = (event, postId) => {
    event.preventDefault();
    switch(event.target.name) {
      case('post'): 
        return API.postPost(postToPost).then(res=> setPostToPost('')).then(() => API.setPost(setPosts)).catch(err => console.log(err));
      case('comment'): 
        return API.postComment(postComment, event.target.getAttribute('data-postId'))
        .then(res=> {
          setPostComment('');
          document.querySelector('.comment-input').textContent = 'Say a comment';
        })
        .then(() => API.setPost(setPosts));
      case('like'): 
        return API.likePost(event.target.getAttribute('data-postId'), 1)
          .then(res=> setPostComment(''))
          .then(() => API.setPost(setPosts))
          .catch(err => console.log(err));
      case('search'): 
        return API.searchPosts(search)
          .then(res=> setPosts(res.data.data.data))
      default:
        return null;
    }
  }
  return (
    <div className="home-page-container">
      <form className="home-search-form">
        <Label className="search-input-label" />
        <Input 
          className="search-input form-input form-inherit"
          onChange={handleInputChange}
          name="search"
          type="text"
          value={search ? search: undefined}
          placeholder="What is your plan?"
        />
        <Input 
          className="form-btn form-inherit"
          name="search"
          type="submit"
          value="Search"
          onClick={handleFormSubmit}
        />
      </form>
      <form className="home-search-form">
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
      </form>
      <div className="post-container">
      {posts.length !== 0 ? posts.map((post, i) => {
        const postedTime = utilsFunc.getDuration(post.createdAt);
        return (
        <div key={i} className="post-wrapper">
          <div className="post-header">
            <a className="post-owner-name" href="/">{post.user.firstName}</a>
            <p className="posted-time">{postedTime}</p>
          </div>
          <div className="post-body">
            <p className="post">{post.post}</p>
            <div className="post-likes-comments-wrapper">
              <div className="like-wrapper">
                  <Input 
                    className="like-btn form-inherit"
                    onClick={handleFormSubmit}
                    name="like"
                    type="submit"
                    value='Like'
                    data-postId={post._id}
                  />
                <span className="post-likes likes-comment">{post.noOfLike} </span>
              </div>
              <div>
                <span className="post-comments-logo">All Comments </span>
                <span className="post-comments">{post.comments.length}</span>
              </div>
            </div>
            <div className="comments-wrapper">
            {post.comments? post.comments.map((comment,i) => {
              return (
                <div key={i} className="comment-wrapper">
                  <div className="comment">
                    <span className="user-commented">{comment.user.firstName}</span>
                    <span className="post-comment">{comment.comment}</span>
                  </div>
                  <p>{utilsFunc.getDuration(comment.createdAt)}</p>
                </div>);
            }
            )
            :
            null
            }
            </div>
            <form className="home-comment-form">
              <div className="input-wrapper">
                <div className="comment-input" onInput={handleInputChange} contentEditable="true">Say a comment</div>
              </div>
              <Input 
                className="form-btn form-inherit"
                onClick={handleFormSubmit}
                name="comment"
                type="submit"
                value="Comment"
                data-postId={post._id}
              />
            </form>
          </div>
        </div>
        
      )
      } 
        )
      : 
      <h1>No Posts Found</h1>  
      }
      </div>
    </div>
  );
}

export default Home;