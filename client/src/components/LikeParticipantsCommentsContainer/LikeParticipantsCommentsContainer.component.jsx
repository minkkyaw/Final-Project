import React from 'react';

import './LikeParticipantsCommentsContainer.styles.scss';

import LabelAmountWrapper from '../label-amount-wrapper/label-amount-wrapper.component';

const LikeParticipantsCommentsContainer = ({currentPost}) => {
  return (
    <div className="like-participants-comment">
      <LabelAmountWrapper label="Like" amount={currentPost.userIdsLiked.length} />
      <LabelAmountWrapper label="Participants" amount="0" />
      <LabelAmountWrapper label="All Comments" amount={currentPost.comments.length} />
    </div>
  );
};

export default LikeParticipantsCommentsContainer;