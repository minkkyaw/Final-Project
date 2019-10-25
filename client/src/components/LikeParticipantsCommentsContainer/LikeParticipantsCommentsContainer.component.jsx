import React from 'react';

import './LikeParticipantsCommentsContainer.styles.scss';

import LabelAmountWrapper from '../label-amount-wrapper/label-amount-wrapper.component';

const LikeParticipantsCommentsContainer = props => {
  return (
    <div className="like-participants-comment">
      <LabelAmountWrapper label="Like" amount="0" />
      <LabelAmountWrapper label="Participants" amount="0" />
      <LabelAmountWrapper label="All Comments" amount="0" />
    </div>
  );
};

export default LikeParticipantsCommentsContainer;