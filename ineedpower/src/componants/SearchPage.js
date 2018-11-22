import React from "react";
import Header from "./Header";
import ProjectDisplay from "./projectsDisplay";
import Problems from "./CreateProject";

class Projects extends React.Component {
  render() {
    const querry = `http://localhost:5000/displayProjects/tag/${
      this.props.search
    }`;
    console.log(querry);
    return <ProjectDisplay title={this.props.search} fetch={querry} />;
  }
}

class UserSearch extends React.Component {
  render() {
    const querry = `http://localhost:5000/users/${this.props.search}`;
    console.log(querry);
    return <p />;
  }
}

class ProblemSearch extends React.Component {
  render() {
    const querry = `http://localhost:5000/project/projectproblem/${
      this.props.search
    }`;
    console.log(querry);
    return <Problems title={this.props.search} fetch={querry} />;
  }
}

class SearchPage extends React.Component {
  render() {
    const hash = this.props.location.hash.substr(1); // splitsen van zoektermen

    if (true) {
      return (
        <div>
          <Header version="home" />
          <div className="projectContainer">
            <Projects search={hash} />
          </div>
        </div>
      );
    } else {
      return <p />;
    }

    /*             <div>
                <Header version="home" />
                <div className="profileContainer">
                <UserSearch search={hash} ></UserSearch>
                </div>
            </div>

            <div>
                <Header version="home" />
                <div className="problemBox">
                <ProblemSearch search={hash} ></ProblemSearch>
                </div>
            </div> */
    // }     (haakje van if)
  }
}

export default SearchPage;
