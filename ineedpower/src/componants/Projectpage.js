import React from 'react';
import Header from './Header';
import '../css/projectpage.css';

const commentLikes = [
    {
        likeId: 1,
        commentId: 1
    }, {
        likeId: 2,
        commentId: 1
    }, {
        likeId: 3,
        commentId: 1
    }, {
        likeId: 3,
        commentId: 3
    }
]

const projectLike =
{
    projectLikeId: 1
}

class ProjectData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: this.props.project,
            Owner: {},
            fetched: false
        }
        this.handleEmailClick = this.handleEmailClick.bind(this);
    }

    handleEmailClick() {
        var body = `Dear ${this.state.Owner.name},` + "%0D%0A" + "%0D%0A"
        body += `Could I join ${this.state.project.name}?` + "%0D%0A"
        body += `I would like to help you on your project.` + "%0D%0A" + "%0D%0A"
        body += `Yours sincerely`
        var address = this.state.Owner.email;
        var subject = `Joining ${this.state.project.name}`
        var mail = "mailto:" + address + "?"
            + "subject=" + subject + "&"
            + "body=" + body;
        return mail;

    }

    componentDidMount() {
        fetch(`http://localhost:5000/project/owner/${this.props.project.projectId}`)
            .then(res => res.json())
            .then(res => this.setState({ Owner: res[0], fetched: true }));
    }


    render() {
        if (this.state.fetched) {
            console.log(this.state.Owner);
            const project = this.props.project;
            project.creationDate = project.creationDate.slice(0, 10);
            return (
                <div>

                    <div className="paragraafEditProj">

                        <button className="buttonEditProj"><a value={this.state.testUser} href={this.handleEmailClick()}>JOIN</a></button>
                        
                        <p>
                            <span><b>Project name:</b></span>
                            <span>{project.name}</span>
                        </p>

                        <div>
                            <span><b>Likes:</b></span>
                            <span className="fitIn"><Like projectLikeId={projectLike.projectLikeId}></Like></span>
                        </div>

                        <p>
                            <span><b>Owner:</b></span>
                            <span>{this.state.Owner.name}</span>
                        </p>

                        <p>
                            <span><b>Creation Date:</b></span>
                            <span>{project.creationDate}</span>
                        </p>

                        <p>
                            <span><b>Description:</b></span>
                            <span>{project.description}</span>
                        </p>

                        <p>
                            <span><b>Groupsize:</b></span>
                            <span>{project.groupsize}</span>
                        </p>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="rightButton">
                        <div>
                            <div ><span className="buttonEditProj"><a value={this.state.testUser} href={this.handleEmailClick()}>JOIN</a></span></div>
                        </div>
                    </div>
                    <div className="paragraafEditProj">
                        <p><b>Project name:</b></p>

                        <div>
                            <p><b>Likes:</b></p>
                            <span className="fitIn"></span>
                        </div>

                        <p><b>Owner:</b></p>

                        <p><b>Creation Date:</b></p>

                        <p><b>Description:</b></p>

                        <p><b>Groupsize:</b></p>
                    </div>
                </div>
            );
        }

    };
}

class Tags extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: {},
            fetched: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/projecttags/${this.props.id}`)
            .then(res => res.json())
            .then(res => this.setState({ tags: res, fetched: true }));
    }

    render() {
        let competenceList = "";
        if (this.state.fetched) {
            console.log(this.state.tags);
            competenceList = this.state.tags.map(tag => (
                <div className="tags" key={tag.tagId}><span>{tag.tag}</span></div>
            ))
        }

        return (
            <div>
                <div className="profileTitle">
                    <b>Competences</b>
                </div>
                <div className="profileContainer">
                    {competenceList}
                </div>
            </div>
        );
    }
}

class Like extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            commentId: this.props.commentId
        }
        this.handleLikeClick = this.handleLikeClick.bind(this);
    }

    handleLikeClick(e) {
        if (!this.state.liked) {
            e.target.className = "far fa-thumbs-up styleLikeComment likeClicked";
            const like = {
                commentId: this.state.commentId
            }
            commentLikes.push(like);
            this.setState({
                liked: true
            });
        } else {
            e.target.className = "far fa-thumbs-up styleLikeComment";
            this.setState({
                liked: false
            });
            commentLikes.pop();
        }
    }

    likes() {
        let teller = 0;
        for (let index = 0; index < commentLikes.length; index++) {
            if (this.state.commentId === commentLikes[index].commentId) {
                teller++;
            }
        }
        return teller;
    }

    render() {
        return (
            <div className="ProjectLike">
                <i className="far fa-thumbs-up styleLikeComment" onClick={this.handleLikeClick}></i>
                {this.likes()}
            </div>
        )
    }
}

class ProjectLinks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            links: {},
            fetched: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/projectlinks/${this.props.id}`)
            .then(res => res.json())
            .then(res => this.setState({ links: res, fetched: true }));
    }

    render() {
        let linksList = "";
        if (this.state.fetched) {
            linksList = this.state.links.map(link => (
                <div className="profileLink" key={link.projectLinkId}><a href={link.url}>{link.url}</a></div>
            ))
        }
        return (
            <div>
                <div className="profileTitle">
                    <b>Links</b>
                </div>
                <div className="profileContainer">
                    {linksList}
                </div>
            </div>
        );
    }
}

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            comments: {},
            fetched: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        fetch(`http://localhost:5000/comments/${this.props.id}`)
            .then(res => res.json())
            .then(res => this.setState({ comments: res, fetched: true }));
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const comment = {
            commentId: 4,
            comment: this.state.value
        }
        this.state.comments.push(comment);
        this.setState({
            value: ""
        });
    }

    render() {
        if (this.state.fetched) {
            const commentsList = this.state.comments.map(comment => (
                <div className="commentBox" key={comment.commentId}>
                    <h4><i className="fas fa-user"></i> {}</h4>
                    <p>{comment.comment}</p>
                    <Like commentId={comment.commentId}></Like>
                </div>
            ))
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
                        <input className="addCommentEditProj" type="text" placeholder="Add comment" value={this.state.value} onChange={this.handleChange}></input>
                    </p>
                </form>
            );
        }

    };
}

class ProjectProblems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problems: {},
            fetched: false
        };

    }

    componentDidMount() {
        fetch(`http://localhost:5000/project/projectproblem/${this.props.id}`)
            .then(res => res.json())
            .then(res => this.setState({ problems: res, fetched: true }));
    }

    render() {
        if (this.state.fetched) {

            const ProblemList = this.state.problems.map(problem => (
                <div className="problemBox" key={problem.problemId}>
                    <p>{problem.problem}</p>
                </div>
            ))
            return (

                <div>
                    <h2 className="profileTitle">Problems</h2>
                    <div className="profileContainer">
                        {ProblemList}
                    </div>

                </div>
            )

        }
        return (
            <p></p>
        );
    };

}

class Projectpage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            project: {},
            fetched: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/displayProject/${this.props.location.hash.substr(1)}`)
            .then(res => res.json())
            .then(res => this.setState({ project: res[0], fetched: true }));
    }


    render() {
        if (this.state.fetched) {
            const id = this.state.project.projectId;
            console.log(this.state.project);
            return (
                <div>
                    <Header version="project" />
                    <ProjectData project={this.state.project} />
                    <ProjectLinks id={id} />
                    <Tags id={id} />
                    <ProjectProblems id={id} />
                    <Comments id={id} />
                </div>
            );
        }
        return (
            <p></p>
        );
    }
}

export default Projectpage;