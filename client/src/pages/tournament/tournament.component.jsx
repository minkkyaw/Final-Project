import React, {useState} from 'react';

import './tournament.styles.scss';

import { Input, ContentEditableInput } from '../../components/Form/form.component';
import CommentFormContainer from '../../components/comment-form-container/comment-form-container.component';

const Tournament = () => {
  const [content, setContent] = useState('');
  const handleInputChange = event => {
    setContent(event.target.textContent);
  };

  return (
    <React.Fragment>
      <form class="tournament-form-container">
        <h4>Create a tournament for you and your friends!</h4>
        <label for="location" class="search-item">Location:</label>
        <Input
          type="text"
          class="input"
          id="location"
          name="location"
          placeholder="Zip Code"
        />
        <label for="location" class="search-item">When:</label>
        <Input
          type="text"
          class="input"
          id="when"
          name="when"
          placeholder="mm/dd/yyyy"
        />
        <label for="location" class="search-item"
          >How many participants?:</label
        >
        <Input
          type="text"
          class="input"
          id="participants"
          name="when"
          placeholder="8"
        />

        <label for="activity" class="search-item">Activity:</label>
        <select id="activity" name="activity">
          <option value="Basketball">Basketball</option>
          <option value="Football">Football</option>
          <option value="Tennis">Tennis</option>
          <option value="Soccer">Soccer</option>
          <option value="Golf">Golf</option>
          <option value="Bowling">Bowling</option>
          <option value="Baseball">Baseball</option>
        </select>
        <br/>
        <label for="activity" class="search-item">Description:</label>
        <ContentEditableInput handleInputChange={handleInputChange}>Add description</ContentEditableInput>
        <Input className="form-submit-btn tournament" type="submit" value="Submit" />
      </form>
      <div class="main-center-container">
        <div className="tournaments-container">
          <h4>Tournaments Near You!</h4>
          <hr />
          <div class="activity-card">
            <div class="user">
              <div class="tournament-img"></div>
              <h5>Tournament Name</h5>
            </div>
            <div class="activity-location-time">
              <p>Activity / Zip Code</p>
              <p>Date / Time</p>
            </div>
            <div>
              <p>Number of Participants:</p>
              <p>
                (Tournament's Description)
                <i
                  >"Lorem ipsum dolor sit amet, consectetur adipisicing
                  elite...</i
                >
              </p>
            </div>
              <Input className="form-submit-btn tournament" type="submit" value="COUNT ME IN" />
              <CommentFormContainer />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Tournament;