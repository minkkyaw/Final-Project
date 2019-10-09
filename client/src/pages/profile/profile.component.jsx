import React from 'react';

import './profile.styles.scss';

const Profile = () => {
  return (
    <div className="profile-page-container">
      <div className="profile-details-wrapper">
        <div className="image-wrapper"></div>
        <div className="details-wrapper">
          <h1>Quattour</h1>
          <p>Full Stack Web Developer</p>
          <p>Philadelphia</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;