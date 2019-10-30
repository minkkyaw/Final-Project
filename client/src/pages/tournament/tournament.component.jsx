import React, {useState, useEffect} from 'react';

import './tournament.styles.scss';

import { Input, ContentEditableInput } from '../../components/Form/form.component';
import CommentFormContainer from '../../components/comment-form-container/comment-form-container.component';
import API from '../../utils/API';
import {changeDateToMMDDYYY} from '../../utils/utilsFunc';

const Tournament = () => {
  const [tournaments, setTournaments] = useState([]);
  const [newTournament, setNewTournament] = useState({
    enrollmentFee: 0,
    pricePool: 0,
    tournament: "",
    maxNumberOfParticipants: '',
    category: "",
    location: "",
    startDate: "",
    description: ""
  });

  useEffect(() => {
    API.getTournaments()
      .then(response => setTournaments(response.data.data.data));
    return setTournaments([])
  }, [])
  const handleInputChange = event => {
    const el = event.target;
    event.preventDefault();
    if(el.name === "category")
      setNewTournament({...newTournament, [el.name]: el.options[el.selectedIndex].value});
    else if(el.name === "startDate")
      setNewTournament({...newTournament, [el.name]: new Date(el.value)});
    else {
      if(el.value) 
        setNewTournament({...newTournament, [el.name]:  el.value});
      else setNewTournament({...newTournament, [el.getAttribute('name')]: el.textContent});
    }
  };
  
  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      let alertCheck = false;
      for(let key in newTournament) {
        if(!newTournament[key])
          alertCheck = true;
        break;
      }
      if(alertCheck) alert("Please Fill all the fields correctly")
      await API.postTournament(newTournament);
    } catch(err) {
      alert(err);
    }
  }

  return (
    <div className="tournament-container">
      <form className="tournament-form-container">
        <h4>Create a tournament for you and your friends!</h4>
        <div className="tournament-form-input-label-wrapper">
          <div className="pairs">
          {/* <label className="tournament-form-label">Name:</label> */}
          <Input
            className="tournament-form-input"
            type="text"
            name="tournament"
            placeholder="Tournament Name"
            onChange={handleInputChange}
          />
          {/* <label className="tournament-form-label">Location:</label> */}
          <Input
            className="tournament-form-input"
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleInputChange}
          />
          </div>
          <div className="pairs">
          {/* <label className="tournament-form-label">Start Date:</label> */}
          <Input
            className="tournament-form-input"
            type="text"
            name="startDate"
            placeholder="Start Date mm/dd/yyyy"
            onChange={handleInputChange}
          />
          {/* <label className="tournament-form-label">Max-number of Participants:</label> */}
          <Input
            className="tournament-form-input"
            type="number"
            name="maxNumberOfParticipants"
            placeholder="Max # of Participants"
            onChange={handleInputChange}
          />
          </div>
          <div className="pairs">
          {/* <label className="tournament-form-label">Enrollment Fee:</label> */}
          <Input
            className="tournament-form-input"
            type="number"
            name="enrollmentFee"
            placeholder="Enrollment Fee $"
            onChange={handleInputChange}
          />
          {/* <label className="tournament-form-label">Price Pool:</label> */}
          <Input
            className="tournament-form-input"
            type="number"
            name="pricePool"
            placeholder="Price Pool $"
            onChange={handleInputChange}
            required
          />
          </div>
          <label className="tournament-form-label">Select Sport:</label>
          <select className="category" onChange={handleInputChange}>
            <option value="Basketball">Basketball</option>
            <option value="Football">Football</option>
            <option value="Tennis">Tennis</option>
            <option value="Soccer">Soccer</option>
            <option value="Golf">Golf</option>
            <option value="Bowling">Bowling</option>
            <option value="Baseball">Baseball</option>
          </select>
        </div>
        <label className="tournament-form-label">Description:</label>
        <ContentEditableInput name="description" handleInputChange={handleInputChange}>Game rules...</ContentEditableInput>
        <Input onClick={handleFormSubmit} className="form-submit-btn tournament" type="submit" value="Submit" />
      </form>
      <div className="main-center-container">
        <div className="tournaments-container">
          <h4>Tournaments Near You!</h4>
          <hr />
          {
            tournaments && tournaments.length > 0 ? 
              tournaments.map(tmt => {
                const {user,pricePool,maxNumberOfParticipants, category, description, competitors, enrollmentFee, _id, location, startDate, tournament,createdAt} = tmt
                return (
                <div className="activity-card">
                  <div className="user">
                    <div className="tournament-img">
                      <img className="profile-pic" src="/images/profile-picture-template.jpeg" alt="Tournament" />
                    </div>
                    <h5>{tournament}</h5>
                  </div>
                  <div className="activity-description">
                    <p className="activity-zipcode"><i id="location" class="material-icons">room</i>{location}</p>
                    <p className="date-time"><div id="date-time"><i id="date" class="material-icons">date_range</i>{changeDateToMMDDYYY(createdAt)}</div></p>
                  </div>
                  <p><span className="tournament-details-label">Number of Participants:</span><span className="tournament-details-value">{maxNumberOfParticipants}</span></p>
                  <p><span className="tournament-details-label">Enrollment fee:</span><span className="tournament-details-value">{`$${enrollmentFee}`}</span></p>
                  <p><span className="tournament-details-label">Price Pool:</span><span className="tournament-details-value">{`$${pricePool}`}</span></p>
                  <p><span className="tournament-details-label">Start-Date:</span><span className="tournament-details-value">{changeDateToMMDDYYY(startDate)}</span></p>
                  <p><span className="tournament-details-label">Category:</span><span className="tournament-details-value">{category}</span></p>
                  <p><span className="tournament-details-label">Participants:</span><span className="tournament-details-value">{competitors && competitors.length > 0 ? competitors.join(', '): 'Coming soon'}</span></p>
                  <p><span className="tournament-details-label">Description:</span><span className="tournament-details-value">{description ? description: ' - '}</span></p>
                  <Input className="form-submit-btn tournament" type="submit" value="Enroll" />
                  <CommentFormContainer />
              </div>)})
            : <h4>CURRENTLY, THERE IS NO TOURNAMENT.</h4>
           }
        </div>
      </div>
    </div>
  );
}

export default Tournament;