import React from 'react';
import Header from './Header';
import Projects from './Projects';
import Userdata from './Profile';
import UserLinks from './UserLinks';
import Competences from './UserCompetences';


class MyProjects extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            fetched: false
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/userProjects')
            .then(res => res.json())
            .then(res => this.setState({ projects: res.data, fetched:true }, () => console.log('projects fetched', res)));
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



class Userpage extends React.Component {
    render() {
        return (
            <div>
                <Header version="user" />
                <Userdata owner="false"></Userdata>
                <UserLinks owner="false"></UserLinks>
                <MyProjects></MyProjects>
                <Competences owner="false"></Competences>
            </div>
        );
    }
}

export default Userpage;