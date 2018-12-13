import React from 'react';
import Header from './Header';
import ProjectDisplay from './projectsDisplay';
import Userdata from './Userdata';
import UserLinks from './UserLinks';
import Competences from './UserCompetences';



class MyProjects extends React.Component {
    render() {
        const fetch = `http://localhost:5000/displayProjects/user/${this.props.userId}`
        return (
            <ProjectDisplay title="Projects" fetch={fetch}/>
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
        if (this.state.fetched) {
            const id = this.state.user.userId;
            return (
                <div>
                    <Header version="user" />
                    <div className="backgrounduser">
                    <Userdata user={this.state.user} owner={false}></Userdata>
                    <UserLinks userId={id} owner={false}></UserLinks>
                    <MyProjects userId={id}></MyProjects>
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