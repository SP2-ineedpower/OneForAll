import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
//import "./index.php";

import Home from "./componants/Home";
import Userpage from "./componants/Userpage";
import Projectpage from "./componants/Projectpage";
import OwnerProjectPage from "./componants/OwnerProjectPage";
import Errorpage from "./componants/Error";
import Profile from "./componants/Profile";
import EditProject from "./componants/CreateProject";
import SearchPage from "./componants/SearchPage";
import NewProject from "./componants/MakeNewProject";
import Leaderbord from "./componants/Leaderbord";
import ProblemPage from "./componants/Problempage";
import Login from "./componants/Login";

require("dotenv").config();

class Application extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter basename="/INeedPower/">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/Userpage" component={Userpage} />
            <Route path="/Projectpage" component={Projectpage} />
            <Route path="/OwnerProjectPage" component={OwnerProjectPage} />
            <Route path="/Profile" component={Profile} />
            <Route path="/CreateProject" component={EditProject} />
            <Route path="/MakeNewProject" component={NewProject} />
            <Route path="/Search" component={SearchPage} />
            <Route path="/Leaderbord" component={Leaderbord} />
            <Route path="/Problem" component={ProblemPage} />
            <Route path="/Login" component={Login} />
            <Route component={Errorpage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById("root"));
