import React from 'react';

import Input from './../../components/Form/form-input.component';
import Label from './../../components/Form/form-label.component';

import './home.styles.scss';

const Home = () => {
  return (
    <div className="home-page-container">
      <form className="home-search-form">
        <Label className="search-input-label" />
        <Input className="search-input form-input form-inherit"
          name="search"
          type="text"
          placeholder="Search"/>
        <Input className="form-btn form-inherit"
          name="search"
          type="submit"
          value="Search"
        />
      </form>
      <form className="home-search-form">
        <Input className="post-input form-input form-inherit"
          name="post"
          type="text"
          placeholder="What's your plan"/>
        <Input className="form-btn form-inherit"
          name="post"
          type="submit"
          value="Post"
        />
      </form>
    </div>
  );
}

export default Home;