import React from 'react'
import {NavLink} from 'react-router-dom'
//import { Button, Segment, TransitionablePortal } from 'semantic-ui-react'


//code from https://react.semantic-ui.com/addons/transitionable-portal/#types-portal

/*export default class ProjectPopup extends Component {
  state = { open: false }

  handleOpen = () => this.setState({ open: true })

  handleClose = () => this.setState({ open: false })

  render() {
    const { open } = this.state

    return (
      <TransitionablePortal
        closeOnTriggerClick
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        openOnTriggerClick
        trigger={
          <Button
            content={open ? 'Submit' : 'Submit'}
            negative={open}
            positive={!open}
          />
        }
      >
        <Segment style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}>
          <p>PROJECT CREATED</p>
          <p>You can find your project in your project list,</p>
          <p>and add extra information in 'Edit Project'.</p>
        </Segment>
      </TransitionablePortal>
    )
  }
}
*/

export default class ProjectPopup extends React.Component {
  
  constructor(props) {
    super(props);

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
          <h2>Project saved</h2>
          <p className="center">You can find your project in your project list
          and add extra information in 'Edit Project'.</p>
          <NavLink to="/Profile"><button className="pSave popButton">back to profile</button></NavLink>
        </div>
      </div>
    );
  }
}