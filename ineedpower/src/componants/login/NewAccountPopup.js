import React from 'react'


export default class NewAccountPopup extends React.Component {
constructor(props){
  super(props);
  this.handleClick = this.handleClick.bind(this);
}

  handleClick() {
    this.props.update();
  }

  render() {
    return (
      <div className="newProject">
        <div className="container">
          <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 200 200">
            <g fill="none" fill-rule="evenodd">
              <circle className="checkmark--circle" cx="100" cy="100" r="84.615" fill="#1F8429" />
              <polyline class="checkmark--check" stroke="#FFF" points="76.923 130.769 123.077 130.769 123.077 38.462" transform="rotate(42 100 84.615)" />
            </g>
          </svg>
          <h2>Profile saved</h2>
          <p className="center">Thank you for creating an account!<br />
          you can find, edit and delete your data on your profile page</p>
          <button className="pSave popButton" onClick={this.handleClick}>back to login</button>
        </div>
      </div>
    );
  }
}