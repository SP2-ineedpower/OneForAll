import React, { Component } from 'react'
import { Rating } from 'semantic-ui-react'

//code from https://react.semantic-ui.com/modules/rating/

//if maken die kijkt of user al gerate werd, als dat zo is update
   //else insert a new rating

const actifUser = { //must change later
  userId: 5
}

export default class RatingExampleOnRate extends Component {
  state = {}


  handleRate = (e, { rating, maxRating }) => {
    this.setState({ rating, maxRating });

    fetch(`http://localhost:5000/rating/add/`, {
      method: 'POST',
      body: JSON.stringify({
          "userId": actifUser.userId,
          "rateduserId": this.props.userId,
          "score": this.state
      }),
      headers: {
          "Content-Type": "application/json",
      }
    });

   }

//<pre>{JSON.stringify(this.state, null, 2)}</pre>
  render() {
    console.log(this.props.projectId);
    console.log(this.props.userId);
      return (
        <div>
          <Rating maxRating={5} defaultRating={0} onRate={this.handleRate} />
        </div>
      )
  }
}
