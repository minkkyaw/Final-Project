import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.scss";

import Home from "./pages/home/home.component";
import Tournament from "./pages/tournament/tournament.component";
import Shop from "./pages/shop/shop.component";
import Profile from "./pages/profile/profile.component";
import LogIn from "./pages/log-in/log-in.component";
import NavBar from "./components/nav-bar/nav-bar-component";

import API from "./utils/API";

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    if (localStorage.getItem("user"))
      setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => console.log(user));

  return (
    <Router>
      <React.Fragment>
        <NavBar user={user ? user : null} />
        {!user ? (
          <Switch>
            <Route exact path="/login/:action" component={LogIn} />
            <Route
              exact
              path="/profile/:id"
              user={user ? user : null}
              component={Profile}
            />
            <Route path="/" component={LogIn} />
          </Switch>
        ) : (
          <React.Fragment>
            <Switch>
              <Route
                exact
                path="/"
                user={user ? user : null}
                component={Home}
              />
              <Route exact path="/login/:action" component={LogIn} />
              <Route
                exact
                path="/home"
                user={user ? user : null}
                component={Home}
              />
              <Route
                exact
                path="/tournament"
                user={user ? user : null}
                component={Tournament}
              />
              <Route
                exact
                path="/profile/:id"
                user={user ? user : null}
                component={Profile}
              />
              {/* <Route component={NoMatch} /> */}
            </Switch>
          </React.Fragment>
        )}
      </React.Fragment>
    </Router>
  );
};

export default App;
