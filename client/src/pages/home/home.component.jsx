import React, { useState, useEffect } from 'react';

import Input from './../../components/Form/form-input.component';
import Label from './../../components/Form/form-label.component';

import './home.styles.scss';
import API from '../../utils/API';
import utilsFunc from '../../utils/utilsFunc.js'

const Home = () => {
  const [postToPost, setPostToPost] = useState('');
  const [posts, setPosts] = useState();
  const [postComment, setPostComment] = useState('Say a comment');

  const handleInputChange = event => {
    switch(event.target.name) {
      case ('post'): 
        return setPostToPost(event.target.value);
      default: 
        return setPostComment(event.target.textContent);
    }
  }

  useEffect(async () => {
    let response = await API.getAllPosts()
    setPosts(response.data.data.data)
  },[])

  useEffect(() => {
    if(posts) console.log(posts);
  },[posts])
  
  
  
  const handleFormSubmit = (event, postId) => {
    event.preventDefault();
    switch(event.target.name) {
      case('post'): 
        return API.postPost(postToPost).then(res=> console.log(res)).catch(err => console.log(err));
      case('comment'): 
        return API.postComment(postComment, event.target.getAttribute('data-postId')).then(res=> console.log(res));
      default:
        return null;
    }
  }
  return (
    <div className="home-page-container">
      <form className="home-search-form">
        <Label className="search-input-label" />
        <Input className="search-input form-input form-inherit"
          name="search"
          type="text"
          placeholder="Search"/>
        <Input className="form-btn form-inherit"
          name="search"
          type="submit"
          value="Search"
        />
      </form>
      <form className="home-search-form">
        <Input className="post-input form-input form-inherit"
          onChange={handleInputChange}
          name="post"
          type="text"
          value={postToPost ? postToPost: undefined}
          placeholder="What is your plan?"
          />
        <Input className="form-btn form-inherit"
          onClick={handleFormSubmit}
          name="post"
          type="submit"
          value="Post"
        />
      </form>
      <div className="post-container">
      {posts ? posts.map((post, i) => {
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
              <div>
                <span className="post-likes-logo">Like </span>
                <span className="post-likes likes-comment">1000 </span>
              </div>
              <div>
                <span className="post-comments-logo">All Comments </span>
                <span className="post-comments">{post.comments.length}</span>
              </div>
            </div>
            <div className="comments-wrapper">
            {post.comments? post.comments.map(comment => {
              return (
                <div className="comment-wrapper">
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
                <div className="comment-input" onInput={handleInputChange} contentEditable="true"></div>
              </div>
              <Input className="form-btn form-inherit"
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
      null  
      }
      </div>
    </div>
  );
}

export default Home;