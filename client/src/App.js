import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Books from "./pages/Books";
// import Detail from "./pages/Detail";
// import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";

import Home from "./pages/home/home.component";
import Tournament from "./pages/tournament/tournament.component";
import Shop from "./pages/shop/shop.component";
import Profile from "./pages/profile/profile.component";
import LogIn from "./pages/log-in/log-in.component";
import NavBar from "./components/nav-bar/nav-bar-component";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login/:action" component={LogIn} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/tournament" component={Tournament} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/profile" component={Profile} />
          {/* <Route exact path="/books" component={Books} /> */}
          {/* <Route component={NoMatch} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
