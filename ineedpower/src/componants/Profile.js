import React from 'react';
import Header from './Header';
import Projects from './Projects';
import Userdata from './Userdata';
import UserLinks from './UserLinks';
import Competences from './UserCompetences';
import '../css/profile.css';

class MyProjects extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            fetched: false
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/userprojects')
            .then(res => res.json())
            .then(res => this.setState({ projects: res.data, fetched: true }, () => console.log('projects fetched', res)));
    }

    render() {
        if (this.state.fetched) {
            return (
                <div>
                    <p className="profileTitle"><b>Projects</b></p>
                    <div className="profileContainer">
                        <Projects projs={this.state.projects} ></Projects>
                    </div>
                </div>
            );
        } else {
            return <p>projects can't be fetched</p>
        }
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
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(res => this.setState({ user: res.data, fetched: true }, () => console.log('user fetched', res)));
    }

    render() {
        if (this.state.fetched) {
            const id = this.state.user[0].userId;
            return (
                <div>
                    <Header version="user"></Header>
                    <Userdata user={this.state.user[0]} owner={true}></Userdata>
                    <UserLinks userId={id} owner={true}></UserLinks>
                    <MyProjects userId={id}></MyProjects>
                    <Competences userId={id} owner={true}></Competences>
                </div>
            );
        } else {
            return <p></p>;
        }

    }
}

export default Profile;