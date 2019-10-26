import React from 'react';

import './label-amount-wrapper.styles.scss';

const LabelAmountWrapper = props => {
  const {label, amount} = props;
  return (
    <div className="label-amount-wrapper">
      <p data-action="whatever" onClick={(event) => console.log(event.target.getAttribute('data-action'))} className="post-label">{label}</p>
      <p className="post-amount">{amount}</p>
    </div>
  );
};

export default LabelAmountWrapper;