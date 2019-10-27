import React from 'react';

import './LikeParticipantsCommentsContainer.styles.scss';

import LabelAmountWrapper from '../label-amount-wrapper/label-amount-wrapper.component';

const LikeParticipantsCommentsContainer = () => {
  return (
    <div className="like-participants-comment">
      <LabelAmountWrapper label="Like" />
      <LabelAmountWrapper label="All Comments" />
    </div>
  );
};

export default LikeParticipantsCommentsContainer;