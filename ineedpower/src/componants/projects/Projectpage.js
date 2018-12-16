import React from 'react';
import Header from '../others/Header';
import Comments from '../comments/comments';
import ProjectProblems from './ProjectProblems';
import ProjectLinks from './projectLinks';
import ProjectData from './ProjectData';
import Tags from '../tags/Tags';
import { Redirect } from "react-router-dom";
import checkLogin from "../login/checkLogin";
import '../../css/projectpage.css';
import Users from '../user/Users';    // this displays users 

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
        if (checkLogin(this.props.activeUser)) {
            return <Redirect to="/" />;
        }
        if (this.state.fetched) {
            const id = this.state.project.projectId;
            const user = this.props.activeUser;
            return (
                <div>
                    <Header version="project" />
                    <ProjectData project={this.state.project} user={user} />
                    <Users fetch={`http://localhost:5000/project/participants/${id}`} title="Participants" />
                    <ProjectLinks id={id} />
                    <Tags id={id} />
                    <ProjectProblems id={id} />
                    <Comments id={id} user={user} />
                </div>
            );
        }
        return (
            <p></p>
        );
    }
}

export default Projectpage;