import React from 'react';
import Header from './Header';
import Projects from './Projects';

class Userdata extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            User: {}
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(res => this.setState({ User: res.data[0] }, () => console.log('user fetched', res)));
    }

    render() {
        const User = this.state.User;
        return (
            <div className="grid-userdata">
                <div className="padding">
                    <p className="profile">
                        <b>Name: </b>
                        <span>{User.name}</span>
                    </p>

                    <p className="profile">
                        <b>Email: </b>
                        <span>{User.email}</span>
                    </p>

                    <div className="profile">
                        <b>Age: </b>
                        <span>{User.age}</span>
                    </div>

                    <div className="profile">
                        <b>Field of study: </b>
                        <span>{User.subject}</span>
                    </div>

                    <div className="profile">
                        <b>Bio: </b>
                        <span>{User.bio}</span>
                    </div>
                </div>
                <div id="wrapper">
                </div>
            </div>
        );
    }
}

class UserLinks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            links:{}
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/userLinks')
            .then(res => res.json())
            .then(res => this.setState({ links: res.data }, () => console.log('links fetched', res)));
    }

    render() {
        const linksList = this.state.links.map(link => (
            <div className="profileLink" key={link.linkId}><a href={link.link}>{link.link}</a></div>
        ))
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

class MyProjects extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            fetched: false
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/projects')
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

class Competences extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            competences:{}
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/userCompetences')
            .then(res => res.json())
            .then(res => this.setState({ competences: res.data }, () => console.log('competences fetched', res)));
    }

    render() {
        const competenceList = this.state.competences.map(competence => (
            <div className="tags" key={competence.competenceId}><span>{competence.competence}</span></div>
        ))
        return (
            <div>
                <div className="profileTitle">
                    <b>Competences</b>
                </div>
                <div className="profileContainer">
                    {competenceList}
                </div>
            </div>
        );
    }
}

class Userpage extends React.Component {
    render() {
        return (
            <div>
                <Header version="user" />
                <Userdata></Userdata>
                <UserLinks></UserLinks>
                <MyProjects></MyProjects>
                <Competences></Competences>
            </div>
        );
    }
}

export default Userpage;