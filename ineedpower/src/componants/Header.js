import React from 'react';
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
        <form onSubmit={this.handleSubmit}>
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
    if (version === "project") {
        return(
            <div className="grid header">
                <p className="back">Back to projects</p>
                <p className="title">Project</p>
                <i className="fas fa-user profileImg fa-3x"></i>
            </div>
        );
    } if (version === "user") {
        return(
            <div className="grid header">
                <p className="back">Terug naar projecten</p>
                <p className="title">Profile</p>
                <i className="fas fa-user profileImg fa-3x"></i>
            </div>
        );
    } if (version === "home") {
        return(
            <div className="grid header">
                <Search/>
                <p className="title">Projects</p>
                <i className="fas fa-user profileImg fa-3x"></i>
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