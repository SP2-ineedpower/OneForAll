import React from 'react';
import Header from './Header';
import ProjectDisplay from './projectsDisplay';
import Userdata from './Userdata';
import UserLinks from './UserLinks';
import Competences from './UserCompetences';
import GetActiveUser from './GetActiveUser';
import '../css/profile.css';

class MyProjects extends React.Component {
    render() {
        const fetch = `http://localhost:5000/displayProjects/user/${this.props.userId}`
        return (
            <ProjectDisplay title="Projects" fetch={fetch}/>
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
        const user = GetActiveUser();
        fetch(`http://localhost:5000/users/${user.userId}`)  // replace 1 by current user
            .then(res => res.json())
            .then(res => this.setState({ user: res, fetched: true }));
    }

    render() {
        if (this.state.fetched) {
            const id = this.state.user[0].userId;
            return (
                <div>
                    <Header version="user"></Header>
                    <div className="backgroundprofile">
                    <Userdata user={this.state.user[0]} owner={true}></Userdata>
                    <UserLinks userId={id} owner={true}></UserLinks>
                    <MyProjects userId={id}></MyProjects>
                    <Competences userId={id} owner={true}></Competences>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="background">
                <p></p>
                </div>
            );
        }

    }
}

export default Profile;