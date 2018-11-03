import React from 'react';
import Header from './Header';
import Projects from './Projects';

const projects = [
    {
        id: 1,
        title: "Ineedpower",
        owner: "nicolas pecher",
        tags: "c++"
    }, {
        id: 2,
        title: "PowerneedI",
        owner: "piet piraat",
        tags: "js"
    }
];

const tags = [
    {
        tagId: 1,
        competence: "test"
    }, {
        tagId: 2,
        competence: "c++"
    }, {
        tagId: 3,
        competence: "java"
    }
]
const links = [
    {
        linkId: 1,
        link: "https://nicolas-pecher.github.io/SidhartaProject/"
    }, {
        linkId: 2,
        link: "https://cas.ehb.be/login"
    }
]





class Userdata extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            User : {}
        }
    }

    componentDidMount() {
        console.log("MOUNT")
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
                    <b>Schoolyear: </b>
                    <span>{User.schoolYear}</span>
                </div>

                <div className="profile">
                    <b>subject: </b>
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

    render() {
        const linksList = links.map(link => (
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

function MyProjects() {
    return (
        <div>
            <p className="profileTitle"><b>Projects</b></p>
            <div className="profileContainer">
                <Projects projs={projects}></Projects>
            </div>
        </div>
    );
}

class Competences extends React.Component {
    

    render() {
        const competenceList = tags.map(tag => (
            <div className="tags" key={tag.tagId}><span>{tag.competence}</span></div>
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