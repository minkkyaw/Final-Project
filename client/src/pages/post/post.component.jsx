import React,{ useState, useEffect } from 'react';

import './post.styles.scss';

import API from '../../utils/API';

const PostPage = ({match}) => {
  useEffect(() => API.getPost(match.params.id)
    .then(response => {
      console.log(response.data.data.data)
    }),[]);
  return (
    <div>In Progress</div>
    // <PostContainer currentPost={currentPost}/>
  )
}

export default PostPage;