import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import './label-amount-wrapper.styles.scss';

import CurrentPostContext from '../../contexts/current-post/current-post.context';
import API from '../../utils/API';

const LabelAmountWrapper = ({label}) => {
  const [redirect, setRedirect] = useState(false);
  const currentPost = useContext(CurrentPostContext);
  const { userIdsLiked, comments, userLiked } = currentPost;
  let amount;
  let style;
  if(label === "Like") {
    if(userLiked === true) style = {color: "rgb(255, 97, 97)"}
    amount = userIdsLiked.length;
  }
  else amount = comments.length
  

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/home' />
    }
  }

  const handleRedirect = label => {
    switch(label) {
      case "Like":
        return API.likePost(currentPost._id, userLiked);
      default:
        return setRedirect(true)
    }
  }

  return (
    <div className="label-amount-wrapper">
      {renderRedirect()}
      <p style={style} onClick={() => handleRedirect(label)} className="post-label">{label}</p>
      <p className="post-amount">{amount}</p> 
    </div>
  );
};

export default LabelAmountWrapper;