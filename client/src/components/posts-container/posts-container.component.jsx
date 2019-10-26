import React, {useContext} from 'react';

import './posts-container.styles.scss';

import PostContainer from '../post-container/post-container.component';
import CurrentPostContext from '../../contexts/current-post/current-post.context';
import PostsContext from '../../contexts/posts/posts.context';


const PostsContainer = () => {
  const posts = useContext(PostsContext);
  return(
    <div className="post-container">
      <h4>Recent Activity</h4>
      <hr style={{"margin-bottom": "20px"}}/>
      {posts.length !== 0 ? posts.map((currentPost, i) => (
          <CurrentPostContext.Provider value={currentPost}>
            <PostContainer 
              key={currentPost._id}
            />
          </CurrentPostContext.Provider>
        )
      ) : 
      (<h1>No Posts Found</h1>)  
      }
    </div>
  )
}

export default PostsContainer;