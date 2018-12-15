import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";

import Home from "./componants/Home";
import Userpage from "./componants/user/Userpage";
import Projectpage from "./componants/projects/Projectpage";
import OwnerProjectPage from "./componants/projects/OwnerProjectPage";
import Errorpage from "./componants/others/Error";
import Profile from "./componants/user/Profile";
import EditProject from "./componants/projects/CreateProject";
import SearchPage from "./componants/search/SearchPage";
import NewProject from "./componants/projects/MakeNewProject";
import Leaderbord from "./componants/leaderboard/Leaderbord";
import ProblemPage from "./componants/problems/Problempage";
import Login from "./componants/login/Login";
require("dotenv").config();

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      logged: false,
    }
    this.setUser = this.setUser.bind(this);
  }

  setUser(user) {
    this.setState({
      user: user,
      logged: true
    })
  }


  // the active user is sent by prop to all the components that need it
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={(props) => <Login {...props} setUser={this.setUser} />} />
          <Route path="/Home" render={(props) => <Home {...props} activeUser={this.state.user} />} />
          <Route path="/Userpage" render={(props) => <Userpage {...props} activeUser={this.state.user} />} />
          <Route path="/Projectpage" render={(props) => <Projectpage {...props} activeUser={this.state.user} />} />
          <Route path="/OwnerProjectPage" render={(props) => <OwnerProjectPage {...props} activeUser={this.state.user} />} />
          <Route path="/Profile" render={(props) => <Profile {...props} activeUser={this.state.user} />} />
          <Route path="/EditProject" render={(props) => <EditProject {...props} activeUser={this.state.user} />} />
          <Route path="/MakeNewProject" render={(props) => <NewProject {...props} activeUser={this.state.user} />} />
          <Route path="/Search" component={SearchPage} />
          <Route path="/Leaderbord" component={Leaderbord} />
          <Route path="/Problem" render={(props) => <ProblemPage {...props} activeUser={this.state.user} />} />
          <Route component={Errorpage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById("root"));
