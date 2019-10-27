import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.scss";

import Home from "./pages/home/home.component";
import Tournament from "./pages/tournament/tournament.component";
import Profile from "./pages/profile/profile.component";
import LogIn from "./pages/log-in/log-in.component";
import NavBar from "./components/nav-bar/nav-bar-component";
import CurrentUserContext from "./contexts/current-user/current-user.context";

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    if (localStorage.getItem("user"))
      setUser(JSON.parse(localStorage.getItem("user")));
    return () => setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => console.log(user));

  return (
    <Router>
      <CurrentUserContext.Provider value={user}>
        <NavBar />

        {!user ? (
          <Switch>
            <Route exact path="/login/:action" component={LogIn} />
            <Route exact path="/profile/:id" component={Profile} />
            <Route component={LogIn} />
          </Switch>
        ) : (
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login/:action" component={LogIn} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/tournaments" component={Tournament} />
              <Route exact path="/profile/:id" component={Profile} />
              {/* <Route component={NoMatch} /> */}
            </Switch>
          </React.Fragment>
        )}
      </CurrentUserContext.Provider>
    </Router>
  );
};

export default App;
