import React from 'react';

class ProjectLike extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: [],
            liked: false,
            class: "far fa-thumbs-up styleLikeComment"
        }
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        fetch(`http://localhost:5000/projectlikes/${this.props.id}`)
            .then(res => res.json())
            .then(res => this.setState({ likes: res },function () {
                this.state.likes.map(like => {
                    if (like.userId === this.props.user) {
                        this.setState({
                            liked: true,
                            class: "far fa-thumbs-up styleLikeComment likeClicked"
                        })
                    }
                })
            }));
    }

    onClick() {
        if (!this.state.liked) {
            this.state.likes.push({});
            this.setState({
                liked: true,
                class: "far fa-thumbs-up styleLikeComment likeClicked"
            })
            fetch(`http://localhost:5000/projectlike/add/${this.props.id}/${this.props.user}`)
        } else {
            this.state.likes.pop();
            this.setState({
                liked: false,
                class: "far fa-thumbs-up styleLikeComment"
            })
            fetch(`http://localhost:5000/projectlike/delete/${this.props.id}/${this.props.user}`)
        }

    }

    render() {
        return (
            <div>
                <i className={this.state.class} onClick={this.onClick}></i>
                <span>{this.state.likes.length}</span>
            </div>
        );
    }
}


export default ProjectLike;