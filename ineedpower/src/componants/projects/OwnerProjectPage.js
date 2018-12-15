import React from 'react';
import { Redirect } from "react-router-dom";
import Header from '../others/Header';
import ProjectProblems from './ProjectProblems';
import ProjectLinks from './projectLinks';
import ProjectData from './ProjectData';
import Tags from '../tags/Tags';
import Users from '../user/Users';
import '../../css/projectpage.css';
import Comments from '../comments/comments';
import checkLogin from "../login/checkLogin";

class OwnerProjectpage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            project:{},
            fetched:false  
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/displayProject/${this.props.location.hash.substr(1)}`)
            .then(res => res.json())
            .then(res => this.setState({ project: res[0], fetched:true }));
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
                    <ProjectData project={this.state.project} user={user} owner={true}/>
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

export default OwnerProjectpage;