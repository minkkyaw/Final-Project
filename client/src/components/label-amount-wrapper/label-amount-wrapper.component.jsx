import React, { useContext } from 'react';

import './label-amount-wrapper.styles.scss';

import CurrentPostContext from '../../contexts/current-post/current-post.context';
import ReloadPostContext from '../../contexts/reload-post/reload-post.context';
import CurrentUserContext from '../../contexts/current-user/current-user.context.js';

import API from '../../utils/API';

const LabelAmountWrapper = ({label}) => {
  const reloadPost = useContext(ReloadPostContext);
  const user = useContext(CurrentUserContext);
  const currentPost = useContext(CurrentPostContext);
  let userId;
  if(user) userId = user.user._id;
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
          .then(() => {
            if(currentPost.user._id !== userId)
              API.createNotifications(currentPost._id, userId ,{notification: `${user.user.firstName} liked your post!`}).then(response => console.log(response.data))
          })
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