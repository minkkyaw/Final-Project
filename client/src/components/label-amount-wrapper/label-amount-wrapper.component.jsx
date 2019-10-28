import React, { useContext } from 'react';

import './label-amount-wrapper.styles.scss';

import CurrentPostContext from '../../contexts/current-post/current-post.context';
import ReloadPostContext from '../../contexts/reload-post/reload-post.context';

import API from '../../utils/API';

const LabelAmountWrapper = ({label}) => {
  const reloadPost = useContext(ReloadPostContext);
  const currentPost = useContext(CurrentPostContext);
  const { userIdsLiked, comments, userLiked } = currentPost;
  let amount;
  let style;
  if(label === "Like") {
    if(userLiked === true) style = {color: "rgb(255, 97, 97)"}
    amount = userIdsLiked.length;
  }
  else amount = comments.length

  const handleSubmit = label => {
    switch(label) {
      case "Like":
        return API.likePost(currentPost._id, userLiked)
          .then(()=> reloadPost())
          .catch(err=> alert(err));
      default:
        return null;
    }
  }

  return (
    <div className="label-amount-wrapper">
      <p style={style} onClick={() => handleSubmit(label)} className="post-label">{label}</p>
      <p className="post-amount">{amount}</p> 
    </div>
  );
};

export default LabelAmountWrapper;