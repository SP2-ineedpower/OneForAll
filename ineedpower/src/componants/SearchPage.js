import React from "react";
import Header from "./Header";
import ProjectDisplay from "./projectsDisplay";
// import Problems from "./CreateProject";
import Users from "./Users"



class SearchPage extends React.Component {
  render() {
    const hash = this.props.location.hash.substr(1); // splitsen van zoektermen
    return (
      <div>
        <Header version="search" />
        <div className="searchContainer">
          <ProjectDisplay title={"Projects containing: " + hash} fetch={`http://localhost:5000/displayProjects/tag/${hash}`} />
          <Users title="Users having this competence" fetch={`http://localhost:5000/users/competence/${hash}`}/>
        </div>
      </div>
    );
  }
}

export default SearchPage;
