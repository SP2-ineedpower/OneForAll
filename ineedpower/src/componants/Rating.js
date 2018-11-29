import React, { Component } from 'react'
import { Rating } from 'semantic-ui-react'

//code from https://react.semantic-ui.com/modules/rating/

//if maken die kijkt of user al gerate werd, als dat zo is update
   //else insert a new rating

const actifUser = { //must change later
  userId: 5
}

class RatingUser extends Component {
  constructor(props) {
    super(props);
      this.state = {
        rating:{},
        fetched:false
      }
    }

  handleRate = (e, { rating, maxRating }) => {
    this.setState({ rating, maxRating });
    fetch(`http://localhost:5000/rating/add/`, {
      method: 'POST',
      body: JSON.stringify({
          "userId": actifUser.userId,
          "rateduserId": this.props.userId,
          "score": rating,
          "projectId": this.props.projectId
      }),
      headers: {
          "Content-Type": "application/json",
      }
    });
   }

   componentDidMount() {
    fetch(`http://localhost:5000/userRating/${this.props.projectId}/${this.props.userId}`)
    .then(res => res.json())
    .then(res => this.setState({ rating: res[0], fetched: true }));
   }
   
  render() {
    if (this.state.fetched && this.state.rating != undefined) {
      return (
        <div>
          <Rating maxRating={5} rating={this.state.rating.score} onRate={this.handleRate} />
        </div>
      )
    } else {
      return (
        <div>
          <Rating maxRating={5} rating={0} onRate={this.handleRate} />
        </div>
      )
    }
  }
}

export default RatingUser