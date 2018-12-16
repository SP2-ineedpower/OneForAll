import React from 'react';
import { Redirect } from "react-router-dom";
import Header from '../others/Header';
import ProjectDisplay from '../projects/projectsDisplay';
import Userdata from './Userdata';
import UserLinks from './UserLinks';
import Competences from './UserCompetences';
import checkLogin from "../login/checkLogin";


class MyProjects extends React.Component {
    render() {
        const fetch = `http://localhost:5000/displayProjects/user/${this.props.user.id}`
        return (
            <ProjectDisplay title="Projects" fetch={fetch} user={this.props.user}/>
        );
    }
}

class Userpage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            fetched: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/users/${this.props.location.hash.substr(1)}`)
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
                    <Header version="user" />
                    <div>
                    <Userdata user={this.state.user} owner={false}></Userdata>
                    <UserLinks userId={id} owner={false}></UserLinks>
                    <MyProjects user={this.props.activeUser}></MyProjects>
                    <Competences userId={id} owner={false}></Competences>
                    </div>
                </div>
            );
        } else {
            return <p></p>;
        }
    }
}

export default Userpage;