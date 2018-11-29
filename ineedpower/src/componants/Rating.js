import React, { Component } from 'react'
import { Rating } from 'semantic-ui-react'
//code from https://react.semantic-ui.com/modules/rating/

const actifUser = { //must change later
  userId: 2
}

export default class RatingExampleOnRate extends Component {
  constructor(props) {
    super(props);
}
  state = {}

  handleRate = (e, { rating, maxRating }) => this.setState({ rating, maxRating })

  pushDataToDatabase() {
    fetch(`http://localhost:5000/rating/add/`, {
        method: 'POST',
        body: JSON.stringify({
            "rateduserId": this.props.id,
            "userId": actifUser.userId,
            "score": this.state.rating
        }),
        headers: {
            "Content-Type": "application/json",
        }
    });
  }
//<pre>{JSON.stringify(this.state, null, 2)}</pre>
  render() {
    return (
      <div>
        <Rating maxRating={5} onRate={this.handleRate}/>
        {this.pushDataToDatabase}
      </div>
    )
  }
}
