import React from "react";
import Header from "./Header";
import ProjectDisplay from "./projectsDisplay";
import Users from "./Users"
import SearchInput from "./SearchInput";
import '../css/searchpage.css';

class SearchDisplay extends React.Component {
  render() {
    if (this.props.select === "All") {
      return (
        <div className="searchContainer">
          <ProjectDisplay title={"Projects containing: " + this.props.search} fetch={`http://localhost:5000/displayProjects/search/${this.props.search}`} update={true} />
          <Users title="Users found" fetch={`http://localhost:5000/users/search/${this.props.search}`} />
        </div>
      );
    } if (this.props.select === "Projects") {
      console.log("searching: " + this.props.search);
      return (
        <div className="searchContainer">
          <ProjectDisplay title={"Projects containing: " + this.props.search} fetch={`http://localhost:5000/displayProjects/search/${this.props.search}`} />
        </div>
      );
    } if (this.props.select === "Users") {
      return (
        <div className="searchContainer">
          <Users title="Users found" fetch={`http://localhost:5000/users/search/${this.props.search}`} />
        </div>
      );

    } if (this.props.select === "Problems") {
      return (
        <div className="searchContainer">
          <ProjectDisplay title={"Projects containing: " + this.props.search} fetch={`http://localhost:5000/displayProjects/search/${this.props.search}`} />
        </div>
      );
    } else {
      //console.log("no search");
      return (

        <div className="searchContainer">
          <ProjectDisplay title={"Projects containing: " + this.props.hash} fetch={`http://localhost:5000/displayProjects/search/${this.props.hash}`} />
          <Users title="Users found" fetch={`http://localhost:5000/users/search/${this.props.hash}`} />
        </div>
      );
    }
  }

}



class SearchPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      search: '',
      select: ''
    }
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(select,search) {
    this.setState({
      search: search,
      select:select
    })
  }

  render() {
    return (
      <div className="searchpage">
        <Header version="search" />
        <SearchInput handleInput={this.handleInput} />
        <SearchDisplay select={this.state.select} search={this.state.search} hash={this.props.location.hash.substr(1)} />
      </div>
    );
  }

}

export default SearchPage;
