import React, { useState,useEffect, useContext } from 'react';

import './user-profile-container.styles.scss';

import { ContentEditableInput } from '../Form/form.component';

import { arrObjToString } from '../../utils/utilsFunc';
import CurrentUserContext from '../../contexts/current-user/current-user.context';
import ReloadPostContext from '../../contexts/reload-post/reload-post.context';
  
import API from '../../utils/API';

const UserProfileContainer = props => {
  const reloadPost = useContext(ReloadPostContext);
  const currentUser= useContext(CurrentUserContext);
  const {firstName, lastName, zipCode, city,interest, skills} = props.userData;

  const [editCheck, setEditCheck] = useState(false);
  const [updateUser, setUpdateUser] = useState({
    firstName: '',
    lastName: '',
    zipCode: '',
    city: '',
    interest: '',
    skills: '',
    photoUrl: undefined
  })
  
  const handleEdit = () => setEditCheck(!editCheck); 
  const handleInputChange = (event, key) => { 
      if(key==="photoUrl") {
        setUpdateUser({...updateUser, [key]: event.target.files})
      }
      else
      setUpdateUser({...updateUser, [key]: event.target.textContent});
    }
  const HandleUpdateData = async () => {
    try {
      await API.updateUser(props.userData._id,updateUser);
      reloadPost();
      setEditCheck(!editCheck);
    } catch(err) {
      console.log(err);
    }
  }
  
  return (
    <React.Fragment>
      <div className="user-image">
        <img className="profile-pic" src={props.userData.photoUrl? props.userData.photoUrl:"/images/profile-picture-template.jpeg"} alt="Profile" />
      </div>
      <div className="user-info-container">
        {
          currentUser && props.userData._id == currentUser.user._id ?
            <p onClick={handleEdit} className="edit-btn">{editCheck ? `Close`: `Edit Profile`}</p>
          : null
        }
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
                skills && skills.length > 0 ? skills.map(skill => {
                  return (
                    <div className="skill-wrapper">
                      <p>{skill.skillName}</p>
                      <div className="skills-bar">
                          <div style={{"width": `${skill.rating}%`, "backgroundColor": "red"}} className="skill">{skill.rating}%</div>
                      </div>
                    </div>
                  )
                }) : <h4>No skill described</h4>
              }
            </div>
          </React.Fragment>
        : (
          
          <div className="edit-user-wrapper">
            <div>
            <input className="image-data" name="myImage" type="file" onChange={event => handleInputChange(event, "photoUrl")} />
            <button onClick={() => {const data = document.querySelector('.image-data').files;
          API.uploadPhoto(currentUser.user._id, data)}}>Submit</button>
          </div>
            <div className="profile-label-input-wrapper">
              <p className="profile-edit-label">Firstname -  </p>
              <ContentEditableInput handleInputChange={event => handleInputChange(event, "firstName")} noChange >{firstName}</ContentEditableInput>
            </div>
            <div className="profile-label-input-wrapper">
              <p className="profile-edit-label">Lastname -  </p>
              <ContentEditableInput handleInputChange={event => handleInputChange(event, "lastName")} noChange >{lastName}</ContentEditableInput>
            </div>
            <div className="profile-label-input-wrapper">
              <p className="profile-edit-label">City -  </p>
              <ContentEditableInput handleInputChange={event => handleInputChange(event, "city")} noChange >{city}</ContentEditableInput>
            </div>
            <div className="profile-label-input-wrapper">
              <p className="profile-edit-label">Zipcode -  </p>
              <ContentEditableInput handleInputChange={event => handleInputChange(event, "zipCode")} noChange >{zipCode}</ContentEditableInput>
            </div>
            <div className="profile-label-input-wrapper">
              <p className="profile-edit-label">Interest -  </p>
              <ContentEditableInput handleInputChange={event => handleInputChange(event, "interest")} noChange >{interest}</ContentEditableInput>
            </div>
            <p id="postedTime">Please put in the format - Football 85 Soccer 79</p>
            <div className="profile-label-input-wrapper">
              <p className="profile-edit-label">Skills -  </p>
              <ContentEditableInput handleInputChange={event => handleInputChange(event, "skills")} noChange >{arrObjToString(skills)}</ContentEditableInput>
            </div>
            <p onClick={HandleUpdateData}>Submit</p>
          </div>
        )}
      </div>
  </React.Fragment>
  )
}

export default UserProfileContainer;