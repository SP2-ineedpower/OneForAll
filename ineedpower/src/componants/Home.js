import React from "react";
import Header from "./Header";
import ProjectDisplay from "./projectsDisplay";
import { Redirect } from "react-router-dom";
import {NavLink} from 'react-router-dom';
import GetActiveUser from './GetActiveUser';


class LikedProjects extends React.Component { 
    render() {
        //this querry will change
        const user = GetActiveUser();
        return (
            <ProjectDisplay title="Liked projects" fetch={`http://localhost:5000/displayProjects/liked/${user.userId}`} />  //replace 1 by current user
        );
    }
}

class CppProjects extends React.Component {
  render() {
    return (
      <ProjectDisplay
        title="C++"
        fetch="http://localhost:5000/displayProjects/tag/cpp"
      />
    );
  }
}

class JavaProjects extends React.Component {
  render() {
    return (
      <ProjectDisplay
        title="Java"
        fetch="http://localhost:5000/displayProjects/tag/java"
      />
    );
  }
}

class WebProjects extends React.Component {
  render() {
    return (
      <ProjectDisplay
        title="Websites"
        fetch="http://localhost:5000/displayProjects/tag/website"
      />
    );
  }
}

class AngularProjects extends React.Component {
  render() {
    return (
      <ProjectDisplay
        title="Angular"
        fetch="http://localhost:5000/displayProjects/tag/angular"
      />
    );
  }
}

class ReactProjects extends React.Component {
  render() {
    return (
      <ProjectDisplay
        title="React"
        fetch="http://localhost:5000/displayProjects/tag/react"
      />
    );
  }
}

class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    console.log(localStorage.getItem("userToken"));
    if (!localStorage.getItem("userToken")) {
      console.log("yuqsgshdqgdgjshdsq");
      this.setState({ redirect: true });
    }
  }

  logout() {
    //userdata set to empty
    sessionStorage.setItem("userToken", "");
    //userdata cleared
    sessionStorage.clear();
    //when logged out, set to true so the redirect (in render) will bring to login
    this.setState({ redirect: true });
  }
  
  render() {
    
    if (this.state.redirect) {
      return <Redirect to={"/Login"} />;
    }
    
    return (
      <div>
        <Header version="home" />
        <div className="projectContainer">
          <NavLink to="/Leaderbord"><button className="leaderboardButton">Leaderboard</button></NavLink>
          <LikedProjects />
          <CppProjects />
          <JavaProjects />
          <WebProjects />
          <AngularProjects />
          <ReactProjects />
        </div>
      </div>
    );
  }
}

export default Home;
