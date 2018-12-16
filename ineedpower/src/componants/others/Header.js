import React from 'react';
import { NavLink } from 'react-router-dom'
import '../../css/header.css';
import logo from '../../pictures/ineedpowerlogo-svg.svg'

//SEARCH BAR
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.value);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="searchform">
                    <label>
                        <input type="text" placeholder="Search" className="search" value={this.state.value} onChange={this.handleChange} />
                        <NavLink to={`/Search/#${this.state.value}`}><button><i className="fas fa-search"></i></button></NavLink>
                    </label>
                </form>
            </div>
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
                className="backButton"
                onClick={this.context.router.history.goBack}>
                Back
        </button>
        )
    }
}

//SELECTING THE ACTIVE HEADER
function Headerversion(version) {


    const back = <div className="back"><NavLink to="/Home">Back to projects</NavLink></div>
    const prof_score = <div className="right">
                        <NavLink className="profileLink" to="/Leaderbord"><span>Leaderboard</span></NavLink>
                        <NavLink to="/Profile" className="profileLink"><span>Your Profile</span></NavLink>
                        </div>;
    const headerImg = <img className="headerLogo" src={logo} width="70" height="80" alt="" />

    if (version === "project") {
        return (
            <div className="grid header">
                <BackButton></BackButton>
                <p className="title">Project Title</p>
                {prof_score}
            </div>
        );
    } if (version === "newproject") {
        return (
            <div className="grid header">
                {back}
                <p className="title">New Project</p>
                {prof_score}
            </div>
        );
    } if (version === "user") {
        return (
            <div className="grid header">
                {back}
                <p className="title">Profile</p>
                {prof_score}
            </div>
        );
    } if (version === "home") {
        return (
            <div className="grid header">
                <Search />
                {headerImg}
                {prof_score}
            </div>
        );
    } if (version === "newProject") {
        return (
            <div className="grid header">
                {back}
                <p className="title">Edit project</p>
                {prof_score}
            </div>
        );
    } if (version === "search") {
        return (
            <div className="grid header">
                {back}
                <p className="title">Search</p>
                {prof_score}
            </div>
        );
    } if (version === "Leaderbord") {
        return (
            <div className="grid header">
                {back}
                <p className="title">Leaderboard</p>
                {prof_score}
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