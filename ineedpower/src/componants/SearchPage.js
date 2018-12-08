import React from "react";
import Header from "./Header";
import ProjectDisplay from "./projectsDisplay";
import Users from "./Users"
import SearchInput from "./SearchInput";
import { NavLink } from 'react-router-dom';
import '../css/searchpage.css';


// displays problems in wich the searched keyword appears
class SearchProblems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problems: {},
      fetched: false
    };
  }

  componentDidMount() {
    fetch(`http://localhost:5000/problemSearch/${this.props.search}`)
      .then(res => res.json())
      .then(res => this.setState({ problems: res, fetched: true }));
  }

  componentWillReceiveProps(nextProps) {
    fetch(`http://localhost:5000/problemSearch/${nextProps.search}`)
        .then(res => res.json())
        .then(res => this.setState({ problems: res, fetched: true }));
}

  render() {
    if (this.state.fetched) {

      const ProblemList = this.state.problems.map(problem => (
        <NavLink key={problem.problemId} to={`/problem/#${problem.problemId}`}>
          <div className="problemBox">
            <p>{problem.problem}</p>
          </div>
        </NavLink>

      ))
      return (
        <div>
          <h2 className="profileTitle">Problems containing: {this.props.search}</h2>
          <div className="profileContainer">
            {ProblemList}
          </div>
        </div>
      )
    }
    return (
      <p></p>
    );
  };
}



class SearchDisplay extends React.Component {
  render() {
    if (this.props.select === "All") {
      return (
        <div className="searchContainer">
          <ProjectDisplay title={"Projects containing: " + this.props.search} fetch={`http://localhost:5000/displayProjects/search/${this.props.search}`} update={true} />
          <Users title="Users found" fetch={`http://localhost:5000/users/search/${this.props.search}`} />
          <SearchProblems search={this.props.search} />
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
          <SearchProblems search={this.props.search} />
        </div>
      );
    } else {
      //console.log("no search");
      return (

        <div className="searchContainer">
          <ProjectDisplay title={"Projects containing: " + this.props.hash} fetch={`http://localhost:5000/displayProjects/search/${this.props.hash}`} />
          <Users title="Users found" fetch={`http://localhost:5000/users/search/${this.props.hash}`} />
          <SearchProblems search = {this.props.hash} />
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

  handleInput(select, search) {
    this.setState({
      search: search,
      select: select
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
