import React from 'react';

import './tournament.styles.scss';

const Tournament = () => {
  return (
    <React.Fragment>
      <div className="ongoing tournaments-wrapper">
        <h1 className="tournament-status">Ongoing</h1>
        <div className="tournament-wrapper">
          <div className="tournament-title">
            TOURNAMENT 1
          </div>
          <div className="tournament-details">
            <p>Price Pool - $200000</p>
            <p>Winner -$100000</p>
            <p>No of Teams - 20</p>
            <p>Due - 10/16/2019</p>
            <p>Date - 10/30/2019</p>
            <p>Current Teams - Min, Matt, Ben, Rebeacca</p>
          </div>
        </div>
        <div className="tournament-wrapper">
          <div className="tournament-title">
            TOURNAMENT 2
          </div>
          <div className="tournament-details">
            <p>Price Pool - $200000</p>
            <p>Winner -$100000</p>
            <p>No of Teams - 20</p>
            <p>Due - 10/16/2019</p>
            <p>Date - 10/30/2019</p>
            <p>Current Teams - Min, Matt, Ben, Rebeacca</p>
          </div>
        </div>
      </div>
      <div className="coming-soon tournaments-wrapper">
        <h1 className="tournament-status">Coming Soon</h1>
        <div className="tournament-wrapper">
          <div className="tournament-title">
            TOURNAMENT 1
          </div>
          <div className="tournament-details">
            <p>Price Pool - $200000</p>
            <p>Winner -$100000</p>
            <p>No of Teams - 20</p>
            <p>Due - 10/16/2019</p>
            <p>Date - 10/30/2019</p>
            <p>Current Teams - Min, Matt, Ben, Rebeacca</p>
          </div>
        </div>
        <div className="tournament-wrapper">
          <div className="tournament-title">
            TOURNAMENT 2
          </div>
          <div className="tournament-details">
            <p>Price Pool - $200000</p>
            <p>Winner -$100000</p>
            <p>No of Teams - 20</p>
            <p>Due - 10/16/2019</p>
            <p>Date - 10/30/2019</p>
            <p>Current Teams - Min, Matt, Ben, Rebeacca</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Tournament;