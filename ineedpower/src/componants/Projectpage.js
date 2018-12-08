import React from 'react';
import Header from './Header';
import Comments from './comments';
import Popup from './Popup';
import { NavLink } from 'react-router-dom';
import '../css/projectpage.css';
import Users from './Users';    // this displays users 

const actifUser = {
    userId: 8
}

class ProjectData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: this.props.project,
            Owner: {},
            participantrequests:{},
            valid: true,
            fetched: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        fetch(`http://localhost:5000/project/owner/${this.props.project.projectId}`)
            .then(res => res.json())
            .then(res => this.setState({ Owner: res[0], fetched: true }));
    }

    componentDidMount() {
        fetch(`http://localhost:5000/participantrequest/${this.props.project.projectId}`)
            .then(res => res.json())
            .then(res => this.setState({ participantrequests: res, fetched: true }));
    }

    handleClick(){
        //const userId = actifUser.userId;
        let userIds = [];
        for (let index = 0; index < this.state.participantrequests.length; index++) {
            let userId = this.state.participantrequests[index].userId;
            userIds.push(userId);
        }
        //console.log(userIds); oke

        for (let index = 0; index < userIds.length; index++) {
            if(userIds[index].userId === actifUser.userId){
                this.setState({
                    valid: false
                  });
            }
        }
        if(this.state.valid) {
            fetch(`http://localhost:5000/participantrequest/add/`, {
            method: 'POST',
            body: JSON.stringify({
                "userId": actifUser.userId,
                "projectId": this.props.project.projectId
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        }
     }

    render() {
        if (this.state.fetched) {
            const project = this.props.project;
            project.creationDate = project.creationDate.slice(0, 10);
            return (
                <div>

                    <div className="paragraafEditProj">

                        <div className="stylish" onClick={this.handleClick} ><Popup></Popup></div>

                        <p>
                            <span><b>Project name:</b></span>
                            <span>{project.name}</span>
                        </p>

                        <div>
                            <span><b>Likes:</b></span>
                            <span className="fitIn"><ProjectLike id={this.props.project.projectId} user={this.props.user}></ProjectLike></span>
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
                        <NavLink to="/JoinProject" className="buttonEditProj">JOIN</NavLink>
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
            competenceList = this.state.tags.map(tag => (
                <div className="tags" key={tag.tagId}><span>{tag.tag}</span></div>
            ))
        }

        return (
            <div>
                <div className="profileTitle">
                    <b>Tags</b>
                </div>
                <div className="profileContainer">
                    {competenceList}
                </div>
            </div>
        );
    }
}

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
            .then(res => this.setState({ likes: res }, function () {
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
                <NavLink key={problem.problemId} to={`/problem/#${problem.problemId}`}>
                    <div className="problemBox">
                        <p>{problem.problem}</p>
                    </div>
                </NavLink>

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
            return (
                <div>
                    <Header version="project" />
                    <ProjectData project={this.state.project} user={1 /*needs to change in the future*/} />
                    <Users fetch={`http://localhost:5000/project/participants/${id}`} title="Participants" />
                    <ProjectLinks id={id} />
                    <Tags id={id} />
                    <ProjectProblems id={id} />
                    <Comments id={id} user={1 /*needs to change in the future*/} />
                </div>
            );
        }
        return (
            <p></p>
        );
    }
}

export default Projectpage;