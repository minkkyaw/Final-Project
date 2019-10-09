import React from 'react';

import Input from './../../components/Form/form-input.component';

import './log-in.styles.scss';

const LogIn = (props) => {
  const action = props.match.params.action;
  return (
    <div className="log-in-container">
      <h1>{action === "signup" ? "Sign Up" : "Sign In"}</h1>
      <form>
        <Input 
          className="username-input form-input form-inherit"
          name="usename"
          type="text"
          placeholder="Username"
        />
        <Input 
          className="password-input form-input form-inherit"
          name="password"
          type="password"
          placeholder="Password"
        />
        {
          action === 'signup' ? 
          (
          <>
          <Input 
            className="confirm-password-input form-input form-inherit"
            name="confirm-password"
            type="password"
            placeholder="Confirm Password"
          />
          <Input 
            className="form-btn form-inherit"
            name="sign-up"
            type="submit"
            value="Sign up"
          />
          or <a href="/login/signin">Log in</a>
          </>)
          :
          <>
          <Input 
            className="form-btn form-inherit"
            name="sign-in"
            type="submit"
            value="Sign in"
          />
          or <a href="/login/signup">Create new account</a>
          </>
        }
      </form>
    </div>
  );
}

export default LogIn;