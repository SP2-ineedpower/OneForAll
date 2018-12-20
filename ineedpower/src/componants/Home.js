import React from "react";
import Header from "./others/Header";
import ProjectDisplay from "./projects/projectsDisplay";
import checkLogin from "./login/checkLogin";
import { Redirect } from "react-router-dom";


class LikedProjects extends React.Component { 
    render() {
        
        return (
            <ProjectDisplay title="Liked projects" fetch={`http://localhost:5000/displayProjects/liked/${this.props.user.userId}`} user={this.props.user}/>
        );
    }
}

class CppProjects extends React.Component {
  render() {
    return (
      <ProjectDisplay
        title="C++"
        fetch="http://localhost:5000/displayProjects/tag/cpp"
        user={this.props.user}
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
        user={this.props.user}
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
        user={this.props.user}
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
        user={this.props.user}
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
        user={this.props.user}
      />
    );
  }
}

class JavaScriptProjects extends React.Component {
  render() {
    return (
      <ProjectDisplay
        title="JavaScript"
        fetch="http://localhost:5000/displayProjects/tag/javascript"
        user={this.props.user}
      />
    );
  }
}

class CSharpProjects extends React.Component {
  render() {
    return (
      <ProjectDisplay
        title="C#"
        fetch="http://localhost:5000/displayProjects/tag/c#"
        user={this.props.user}
      />
    );
  }
}

class NodeProjects extends React.Component {
  render() {
    return (
      <ProjectDisplay
        title="Node"
        fetch="http://localhost:5000/displayProjects/tag/node"
        user={this.props.user}
      />
    );
  }
}

class CobolProjects extends React.Component {
  render() {
    return (
      <ProjectDisplay
        title="COBOL"
        fetch="http://localhost:5000/displayProjects/tag/cobol"
        user={this.props.user}
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

  logout() {
    //userdata set to empty
    sessionStorage.setItem("userToken", "");
    //userdata cleared
    sessionStorage.clear();
    //when logged out, set to true so the redirect (in render) will bring to login
    this.setState({ redirect: true });
  }
  
  render() {

    if (checkLogin(this.props.activeUser) || this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Header version="home" />
        <div className="projectContainer">
          
          <LikedProjects user={this.props.activeUser} />
          <CppProjects user={this.props.activeUser}/>
          <JavaProjects user={this.props.activeUser}/>
          <WebProjects user={this.props.activeUser}/>
          <AngularProjects user={this.props.activeUser}/>
          <ReactProjects user={this.props.activeUser}/>
          <JavaScriptProjects user={this.props.activeUser}/>
          <CSharpProjects user={this.props.activeUser}/>
          <CobolProjects user={this.props.activeUser}/>
          <NodeProjects user={this.props.activeUser}/>
        </div>
      </div>
    );
  }
}

export default Home;
