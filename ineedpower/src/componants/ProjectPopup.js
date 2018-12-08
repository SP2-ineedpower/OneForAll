import React from 'react'
import {NavLink} from 'react-router-dom'
//import { Button, Segment, TransitionablePortal } from 'semantic-ui-react'


//code from https://react.semantic-ui.com/addons/transitionable-portal/#types-portal

export default class ProjectPopup extends React.Component {

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
          <h2>Project saved</h2>
          <p className="center">You can find your project in your project list
          and add extra information in 'Edit Project'.</p>
          <NavLink to="/Profile"><button className="pSave popButton">back to profile</button></NavLink>
        </div>
      </div>
    );
  }
}