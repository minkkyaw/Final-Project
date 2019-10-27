import React from 'react';

const UserProfileContainer = props => {
  const {firstName, lastName, zipCode, city} = props.userData;
  return (
    <div className="user-container">
      <div className="user-image">
        <img className="profile-pic" src="/images/profile-picture-template.jpeg" alt="Profile Image" />
      </div>
      <div className="user-info-container">
        <h2>{`${firstName} ${lastName}`}</h2>
        <div className="user-info">
          <p><i className="material-icons">sports</i> Basketball, Golf</p>
          <p><i className="material-icons">home</i>{`${city} ${zipCode}`}</p>
        </div>
        <hr />
        <div className="skills-container">
          <h3>Skills</h3>
          <p>Shooting</p>
          <div className="skills-bar">
              <div className="skill one">90%</div>
          </div>

          <p>Dunking</p>
          <div className="skills-bar">
              <div className="skill two">80%</div>
          </div>

          <p>Long Range Golf</p>
          <div className="skills-bar">
              <div className="skill three">65%</div>
          </div>

          <p>Driving</p>
          <div className="skills-bar">
              <div className="skill four">60%</div>
          </div>
        </div>
      </div>
  </div>
  )
}

export default UserProfileContainer;