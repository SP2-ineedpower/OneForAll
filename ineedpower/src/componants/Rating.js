import React, { Component } from 'react'
import { Rating } from 'semantic-ui-react'
//code from https://react.semantic-ui.com/modules/rating/

      
export default class RatingExampleOnRate extends Component {
  state = {}

  handleRate = (e, { rating, maxRating }) => this.setState({ rating, maxRating })

  render() {
    return (
      <div>
        <Rating maxRating={5} onRate={this.handleRate} />
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    )
  }
}

/*
export default class RatingExampleOnRate extends Component {
  state = {}

  handleRate = (e, { rating, maxRating }) => {
   this.setState({ rating, maxRating });
   console.log("test");
  }
  
  render() {
    return (
      <div>
        <Rating icon='star' maxRating={5} onRate={this.handleRate} />
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    )
  }
}*/