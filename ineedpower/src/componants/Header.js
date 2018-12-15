import React from 'react';
import {NavLink} from 'react-router-dom'
import '../css/header.css';
import logo from '../pictures/ineedpowerlogo-svg.svg'

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
        event.preventDefault();
        console.log(this.state.value);
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit} className="searchform">
          <label>
            <input type="text" placeholder="Search" className="search"  value={this.state.value} onChange={this.handleChange} />
            <NavLink to={`/Search/#${this.state.value}`}><button><i className="fas fa-search"></i></button></NavLink>
            </label>
        </form>
      );
    }
  }
//END SEARCH BAR


//code from stack overflow https://stackoverflow.com/questions/30915173/react-router-go-back-a-page-how-do-you-configure-history
class BackButton extends React.Component {
    static contextTypes = {
      router: () => null, // replace with PropTypes.object if you use them
    }
  
    render() {
      return (
        <button
          className="back"
          onClick={this.context.router.history.goBack}>
            Back
        </button>
      )
    }
  }

//SELECTING THE ACTIVE HEADER
function Headerversion(version) {
    

    const back = <div className="back"><NavLink to="/Home">Back to projects</NavLink></div>
    const profileImg = <NavLink to="/Profile" className="profileLink"><p>Your Profile</p></NavLink>
    const headerImg = <img className="headerLogo" src={logo} width="50" height="50" alt=""/>
    const leaderboard = <NavLink className="profileLink" to="/Leaderbord"><p>Leaderboard</p></NavLink>

    if (version === "project") {
        return(
            <div className="grid header">
                <BackButton></BackButton>
                <p className="title">Project Title</p>
                {leaderboard}
                {profileImg}
            </div>
        );
    }if (version === "newproject") {
        return(
            <div className="grid header">
                {back}
                <p className="title">New Project</p>
                {leaderboard}
                {profileImg}
            </div>
        );
    } if (version === "user") {
        return(
            <div className="grid header">
                {back}
                <p className="title">Profile</p>
                {leaderboard}
                {profileImg}
            </div>
        );
    } if (version === "home") {
        return(
            <div className="grid header">
                <Search/>
                {headerImg}
                {leaderboard}
                {profileImg}
            </div>
        );
    } if (version === "newProject") {
        return(
            <div className="grid header">
                {back}
                <p className="title">Edit project</p>
                {leaderboard}
                {profileImg}
            </div>
        );
    } if (version ==="search") {
        return(
            <div className="grid header">
            {back}
            <p className="title">Search</p>
            {leaderboard}
            {profileImg}
        </div>
        );
    } if (version === "Leaderbord") {
        return(
            <div className="grid header">
                {back}
                <p className="title">Leaderboard</p>
                {leaderboard}
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