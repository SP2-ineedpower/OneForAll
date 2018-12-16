import React, { Component } from 'react'
import { Button, Segment, TransitionablePortal } from 'semantic-ui-react'

//code from https://react.semantic-ui.com/addons/transitionable-portal/#types-portal

export default class Popup extends Component {
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
            content={open ? 'JOIN' : 'JOIN'}
            negative={open}
            positive={!open}
          />
        }
      >
        <Segment style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}>
          <p>Your request has been sent to the owner.</p>
          <p>Click anywhere to close.</p>
        </Segment>
      </TransitionablePortal>
    )
  }
}