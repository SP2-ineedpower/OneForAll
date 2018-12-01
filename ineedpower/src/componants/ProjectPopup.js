import React, { Component } from 'react'
import { Button, Header, Segment, TransitionablePortal } from 'semantic-ui-react'

//code from https://react.semantic-ui.com/addons/transitionable-portal/#types-portal

export default class ProjectPopup extends Component {
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