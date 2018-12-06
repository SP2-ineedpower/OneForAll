import React, { Component } from 'react'
import { Rating } from 'semantic-ui-react'

//code from https://react.semantic-ui.com/modules/rating/

class RatingUser extends Component {
  constructor(props) {
    super(props);
      this.state = {
        rating:{},
        fetched:false
      }
    }

    handleRateUpdate = (e, { rating, maxRating }) => {
      this.setState({ rating, maxRating });
      fetch(`http://localhost:5000/rating/update/`, {
        method: 'POST',
        body: JSON.stringify({
            "score": rating,
            "rateduserId": this.props.userId,
            "projectId": this.props.projectId,
        }),
        headers: {
            "Content-Type": "application/json",
        }
      });
      window.location.reload();
     }

     handleRateInsert = (e, { rating, maxRating }) => {
      this.setState({ rating, maxRating });
      fetch(`http://localhost:5000/rating/insert/`, {
        method: 'POST',
        body: JSON.stringify({
            "rateduserId": this.props.userId,
            "score": rating,
            "projectId": this.props.projectId
        }),
        headers: {
            "Content-Type": "application/json",
        }
      });
      window.location.reload();
     }
  
   componentDidMount() {
    fetch(`http://localhost:5000/userRating/${this.props.projectId}/${this.props.userId}`)
    .then(res => res.json())
    .then(res => this.setState({ rating: res[0], fetched: true }));
   }
   
  render() {
    if (this.state.fetched && this.state.rating !== undefined) {
      return (
        <div>
          <Rating maxRating={5} rating={this.state.rating.score} onRate={this.handleRateUpdate} />
        </div>
      )
    } else {
      return (
        <div>
          <Rating maxRating={5} rating={0} onRate={this.handleRateInsert} />
        </div>
      )
    }
  }
}

export default RatingUser