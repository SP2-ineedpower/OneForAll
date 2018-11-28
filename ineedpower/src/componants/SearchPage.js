import React from "react";
import Header from "./Header";
import ProjectDisplay from "./projectsDisplay";
import Users from "./Users"
import '../css/searchpage.css';

class SearchDisplay extends React.Component {
  render() {
    if (this.props.select === "All") {
      console.log(this.props.search);
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

class SearchInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      select: 'All'
    }
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleInput(this.state.select,this.state.value)
    
  }

  handleSelect(event) {
    this.setState({ select: event.target.value });
  }

  render() {
    return (
      <form className="searchpageForm" onSubmit={this.handleSubmit}>
        <input type="text" className="searchbar" value={this.state.value} onChange={this.onChange} />
        <select className="searchSelect" value={this.state.select} onChange={this.handleSelect}>
          <option value="All">All</option>
          <option value="Projects">Projects</option>
          <option value="Users">Users</option>
          <option value="Problems">Problems</option>
        </select>
        <button type="submit">Search</button>
      </form>
    )
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
