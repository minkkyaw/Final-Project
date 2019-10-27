import React,{ useState, useEffect } from 'react';

import './post.styles.scss';

import PostContainer from '../../components/post-container/post-container.component';
import API from '../../utils/API';
import CurrentPostContext from '../../contexts/current-post/current-post.context';

const PostPage = ({match}) => {
  const [currentPost, setCurrentPost] = useState({});
  useEffect(() => API.getPost(match.params.id)
    .then(response => {
      setCurrentPost(response.data.data.data)
      console.log(response.data.data.data)
    }),[]);
  return (
    <div>In Progress</div>
    // <PostContainer currentPost={currentPost}/>
  )
}

export default PostPage;