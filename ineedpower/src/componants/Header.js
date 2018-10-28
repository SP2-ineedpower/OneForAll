import React from 'react';
import {NavLink} from 'react-router-dom'
import '../css/header.css';

//SEARCH BAR
class Search extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
        console.log(this.state.value);
        event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit} className="searchform">
          <label>
            <input type="text" placeholder="Search" className="search"  value={this.state.value} onChange={this.handleChange} />
            <button><i className="fas fa-search"></i></button>
            </label>
        </form>
      );
    }
  }
//END SEARCH BAR

//SELECTING THE ACTIVE HEADER
function Headerversion(version) {

    const back = <div className="back"><NavLink to="/">Back to projects</NavLink></div>
    const profileImg = <NavLink to="/Profile" className="profileImg"><i className="fas fa-user fa-3x"></i></NavLink>

    if (version === "project") {
        return(
            <div className="grid header">
                {back}
                <p className="title">Project Title</p>
                {profileImg}
            </div>
        );
    } if (version === "user") {
        return(
            <div className="grid header">
                {back}
                <p className="title">Profile</p>
                {profileImg}
            </div>
        );
    } if (version === "home") {
        return(
            <div className="grid header">
                <Search/>
                <p className="title">Projects</p>
                {profileImg}
            </div>
        );
    } if (version === "newProject") {
        return(
            <div className="grid header">
                <NavLink to="/profile"><p className="back">Back to profile</p></NavLink>
                <p className="title">Edit project</p>
                {profileImg}
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        const headerV = Headerversion(this.props.version)
        return (
            <div>
                {headerV}
            </div>
        );
    }
}

export default Header;