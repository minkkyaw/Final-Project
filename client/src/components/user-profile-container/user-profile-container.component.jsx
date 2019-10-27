import React, { useState } from 'react';

import './user-profile-container.styles.scss';

import { ContentEditableInput } from '../Form/form.component';

import { arrObjToString } from '../../utils/utilsFunc';

import API from '../../utils/API';

const UserProfileContainer = props => {
  const [editCheck, setEditCheck] = useState(false);
  const [updateUser, setUpdateUser] = useState({
    firstName: '',
    lastName: '',
    zipCode: '',
    city: '',
    skills: ''
  })
  console.log(updateUser);
  const {firstName, lastName, zipCode, city,interest, skills} = props.userData;
  console.log(props.userData);
  const handleEdit = () => setEditCheck(!editCheck); 
  const handleInputChange = (event, key) => 
    setUpdateUser({...updateUser, [key]: event.target.textContent});
  const HandleUpdateData = () => {
    API.updateUser(props.userData._id,updateUser);
  }
  
  return (
    <div className="user-container">
      <div className="user-image">
        <img className="profile-pic" src="/images/profile-picture-template.jpeg" alt="Profile Image" />
      </div>
      <div className="user-info-container">
        <p onClick={handleEdit} className="edit-btn">{editCheck ? `Close`: `Edit`}</p>
        { !editCheck ?
          <React.Fragment>
            <h2>{`${firstName} ${lastName}`}</h2>
            <div className="user-info">
              <p><i className="material-icons">sports</i>{interest && interest.length >0 ? interest: '-'}</p>
              <p><i className="material-icons">home</i>{`${city} ${zipCode}`}</p>
            </div>
            <hr />
            <div className="skills-container">
              <h3>Skills</h3>
              {
                skills ? skills.map(skill => {
                  return (
                    <div className="skill-wrapper">
                      <p>{skill.skillName}</p>
                      <div className="skills-bar">
                          <div style={{"width": `${skill.rating}%`, "background-color": "red"}} className="skill">{skill.rating}%</div>
                      </div>
                    </div>
                  )
                }) : <h4>No skill described</h4>
              }
            </div>
          </React.Fragment>
        : (
          <div className="edit-user-wrapper">
            <div className="profile-label-input-wrapper">
              <p className="profile-edit-label">Firstname -  </p>
              <ContentEditableInput handleInputChange={event => handleInputChange(event, "firstName")}>{firstName}</ContentEditableInput>
            </div>
            <div className="profile-label-input-wrapper">
              <p className="profile-edit-label">Lastname -  </p>
              <ContentEditableInput handleInputChange={event => handleInputChange(event, "lastName")}>{lastName}</ContentEditableInput>
            </div>
            <div className="profile-label-input-wrapper">
              <p className="profile-edit-label">City -  </p>
              <ContentEditableInput handleInputChange={event => handleInputChange(event, "city")}>{city}</ContentEditableInput>
            </div>
            <div className="profile-label-input-wrapper">
              <p className="profile-edit-label">Zipcode -  </p>
              <ContentEditableInput handleInputChange={event => handleInputChange(event, "zipCode")}>{zipCode}</ContentEditableInput>
            </div>
            <div className="profile-label-input-wrapper">
              <p className="profile-edit-label">Interest -  </p>
              <ContentEditableInput handleInputChange={event => handleInputChange(event, "interest")}>{interest}</ContentEditableInput>
            </div>
            <p id="postedTime">Please put in the format - Football 85 Soccer 79</p>
            <div className="profile-label-input-wrapper">
              <p className="profile-edit-label">Skills -  </p>
              <ContentEditableInput handleInputChange={event => handleInputChange(event, "skills")}>{arrObjToString(skills)}</ContentEditableInput>
            </div>
            <p onClick={HandleUpdateData}>Submit</p>
          </div>
        )}
      </div>
  </div>
  )
}

export default UserProfileContainer;