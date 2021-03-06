import React from 'react';
import Header from '../others/Header';
import ProjectDisplay from '../projects/projectsDisplay';
import Userdata from './Userdata';
import UserLinks from './UserLinks';
import Competences from './UserCompetences';
import { Redirect } from "react-router-dom";
import '../../css/profile.css';
import checkLogin from '../login/checkLogin';

class MyProjects extends React.Component {
    render() {
        const fetch = `http://localhost:5000/displayProjects/user/${this.props.user.userId}`
        return (
            <ProjectDisplay title="Projects" fetch={fetch} user={this.props.user}/>
        );
    }
}


class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            fetched: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/users/${this.props.activeUser.userId}`)
            .then(res => res.json())
            .then(res => this.setState({ user: res[0], fetched: true }));
    }

    render() {
        if (checkLogin(this.props.activeUser)) {
            return <Redirect to="/" />;
        }
        if (this.state.fetched) {
            const id = this.state.user.userId;
            return (
                <div>
                    <Header version="user"></Header>
                    <div className="backgroundprofile">
                        <Userdata user={this.state.user} owner={true}></Userdata>
                        <UserLinks userId={id} owner={true}></UserLinks>
                        <MyProjects user={this.props.activeUser}></MyProjects>
                        <Competences userId={id} owner={true}></Competences>
                    </div>
                </div>
            );
        } else return <p></p>;
    }
}

export default Profile;