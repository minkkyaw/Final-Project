import React from 'react';

import './posts-container.styles.scss';

import PostContainer from '../post-container/post-container.component';

const PostsContainer = (props) => {
  const {user, posts, handleInputChange, handleInputFocus} = props;
  return(
    <div className="post-container">
      <h4>Recent Activity</h4>
      <hr />
      {posts.length !== 0 ? posts.map((currentPost, i) => (
          <PostContainer 
            key={currentPost._id}
            currentPost={currentPost} 
            user={user} 
            posts={posts} 
            handleInputChange={handleInputChange} 
            handleInputFocus={handleInputFocus}
          />
        )
      ) : 
      (<h1>No Posts Found</h1>)  
      }
    </div>
  )
}

export default PostsContainer;