import React from 'react';
import GetActiveUser from './GetActiveUser';

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            comments: {commentId:1},
            fetched: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        if (this.props.problem) {
            fetch(`http://localhost:5000/problemComments/${this.props.hash}`)   //fetch for problems
                .then(res => res.json())
                .then(res => this.setState({ comments: res, fetched: true }));
        } else {
            fetch(`http://localhost:5000/comments/${this.props.id}`)  // fetch for projects
                .then(res => res.json())
                .then(res => this.setState({ comments: res, fetched: true }));
        }
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let tempNum = 1;  //temporary id of the comment
        if (this.state.comments.length > 0) {
            tempNum = this.state.comments[this.state.comments.length - 1].commentId + 1;
        }
        let comment = "";
        if (this.props.problem) {
            comment = {
                problemCommentId: tempNum,
                comment: this.state.value,
                name: GetActiveUser().username
            }
            fetch(`http://localhost:5000/problemComments/add/`, {  // fetch to add comments to a problem
                method: 'POST',
                body: JSON.stringify({
                    "comment": this.state.value,
                    "problemId": this.props.hash,
                    "userId": GetActiveUser().userId
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
        } else {
            comment = {
                commentId: tempNum,
                comment: this.state.value,
                name: GetActiveUser().username
            }
            fetch(`http://localhost:5000/comments/add/`, {
                method: 'POST',
                body: JSON.stringify({
                    "comment": this.state.value,
                    "projId": this.props.id,
                    "userId": GetActiveUser().userId
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
        }
        this.state.comments.push(comment);
        this.setState({
            value: ""
        });
    }

    render() {
        if (this.state.fetched) {
            let commentsList = "";
            if (this.props.problem) {
                commentsList = this.state.comments.map(comment => (
                    <div className="commentBox" key={comment.problemCommentId}>
                        <h4><i className="fas fa-user"></i> {comment.name}</h4>
                        <p>{comment.comment}</p>
                    </div>
                ))
            } else {
                commentsList = this.state.comments.map(comment => (
                    <div className="commentBox" key={comment.commentId}>
                        <h4><i className="fas fa-user"></i> {comment.name}</h4>
                        <p>{comment.comment}</p>
                    </div>
                ))
            }
            return (
                <form onSubmit={this.handleSubmit}>
                    <h2 className="profileTitle">Comments</h2>
                    <div className="profileContainer">
                        <p><i className="fas fa-user approachComment"></i>
                            <input className="addCommentEditProj" type="text" placeholder="Add comment" value={this.state.value} onChange={this.handleChange}></input>
                        </p>
                        {commentsList}
                    </div>
                </form>);
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <h2 className="titleComments">Comments</h2>
                    <p><i className="fas fa-user approachComment"></i>
                        <input id="commentInput" className="addCommentEditProj" type="text" placeholder="Add comment" value={this.state.value} onChange={this.handleChange}></input>
                    </p>
                </form>
            );
        }

    };
}

export default Comments;