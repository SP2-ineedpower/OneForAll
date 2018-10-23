import React from 'react';
import '../css/header.css';


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
            <i class="fas fa-search"></i>
            </label>
        </form>
      );
    }
  }


function Headerversion(version) {
    if (version === "project") {
        return(
            <div className="grid header">
                <p className="back">Terug naar projecten</p>
                <p className="title">Project</p>
                <i class="fas fa-user profileImg fa-3x"></i>
            </div>
        );
    } if (version === "user") {
        return(
            <div className="grid header">
                <p className="back">Terug naar projecten</p>
                <p className="title">Profile</p>
                <i class="fas fa-user profileImg fa-3x"></i>
            </div>
        );
    } if (version === "home") {
        return(
            <div className="grid header">
                <Search/>
                <p className="title">Projects</p>
                <i class="fas fa-user profileImg fa-3x"></i>
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