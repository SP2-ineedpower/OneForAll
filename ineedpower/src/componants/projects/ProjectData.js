import React from 'react';
import ProjectLike from './ProjectLikes';
import Popup from './Popup';
import { NavLink } from 'react-router-dom';

class ProjectData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: this.props.project,
            Owner: {},
            participantrequests: {},
            valid: true,
            fetched: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        fetch(`http://localhost:5000/project/owner/${this.props.project.projectId}`)
            .then(res => res.json())
            .then(res => this.setState({ Owner: res[0], fetched: true }));
        fetch(`http://localhost:5000/participantrequest/${this.props.project.projectId}`)
            .then(res => res.json())
            .then(res => this.setState({ participantrequests: res }));
    }


    handleClick() {
        const user = this.props.user;
        let userIds = [];
        for (let index = 0; index < this.state.participantrequests.length; index++) {
            let userId = this.state.participantrequests[index].userId;
            userIds.push(userId);
        }
        //console.log(userIds); oke

        for (let index = 0; index < userIds.length; index++) {
            if (userIds[index].userId === user.userId) {
                this.setState({
                    valid: false
                });
            }
        }
        if (this.state.valid) {
            fetch(`http://localhost:5000/participantrequest/add/`, {
                method: 'POST',
                body: JSON.stringify({
                    "userId": user.userId,
                    "projectId": this.props.project.projectId
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
        }
    }

    displayButton() {
        if (this.props.owner) {
            console.log(this.props.project);
            return <NavLink to={`/EditProject/#${this.props.project.projectId}`} className="editButtton">Edit project</NavLink>
        }
        else {
            return <div className="stylish" onClick={this.handleClick} ><Popup></Popup></div>
        }
    }

    render() {
        if (this.state.fetched) {
            const project = this.props.project;
            project.creationDate = project.creationDate.slice(0, 10);
            return (
                <div className="projectRowWrapper">
                    <p className="profileTitle">
                        <b>Project Details</b>
                    </p>
                    <div className="profileContainer">

                        <p className="profile">
                            <span><b>Project name: </b></span>
                            <span>{project.name}</span>
                        </p>

                        <div className="profile">
                            <span><b>Likes: </b></span>
                            <span className="fitIn"><ProjectLike id={this.props.project.projectId} user={this.props.user.userId}></ProjectLike></span>
                        </div>

                        <p className="profile">
                            <span><b>Owner: </b></span>
                            <span>{this.state.Owner.name}</span>
                        </p>

                        <p className="profile">
                            <span><b>Creation Date: </b></span>
                            <span>{project.creationDate}</span>
                        </p>

                        <p className="profile">
                            <span><b>Description: </b></span>
                            <span>{project.description}</span>
                        </p>

                        <p className="profile">
                            <span><b>Groupsize: </b></span>
                            <span>{project.groupsize}</span>
                        </p>

                    </div>
                    {this.displayButton()}
                </div>
            )
        } else {
            return (
                <div className="projectRowWrapper">
                    <p className="profileTitle">
                        <b>Project Details</b>
                    </p>
                    <div className="profileContainer">
                        <p className="profile"><b>Project name: </b></p>

                        <div className="profile">
                            <p><b>Likes: </b></p>
                            <span className="fitIn"></span>
                        </div>

                        <p className="profile"><b>Owner: </b></p>

                        <p className="profile"><b>Creation Date: </b></p>

                        <p className="profile"><b>Description: </b></p>

                        <p className="profile"><b>Groupsize: </b></p>
                    </div>
                </div>
            );
        }

    };
}

export default ProjectData;