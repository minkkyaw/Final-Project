import React from 'react';

import { Input } from './../../components/Form/form.component';

import './log-in.styles.scss';

const LogIn = (props) => {
  // console.log(props.match);
  return (
    <div>
      <h1>Sign In</h1>
      <form>
        <Input 
          className="username-input inherit"
          name="search"
          placeholder="Search"
        />
      </form>
    </div>
  );
}

export default LogIn;