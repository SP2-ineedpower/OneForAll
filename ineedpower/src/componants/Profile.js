import React from 'react';
import Header from './Header';
import Projects from './Projects';
import { NavLink } from 'react-router-dom'
import '../css/profile.css';

const User = {
    userId: 1,
    name: "Nicolas",
    email: "nicolas.pecher@student.ehb.be",
    experience: 0,
    bio: "Ik hou van React",
    schoolYear: "2",
    subject: "dig-x swe",
    age: "19",
    type: "admin"
}

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


function Button(props) {
    return (
        <NavLink to="/createproject"> <button className="projbutton">Make new project</button></NavLink>
    );
}


function Userdata() {
    return (
        <div className="grid-userdata">
            <div className="padding">
                <p className="profile">
                    <b>Name: </b>
                    <span>{User.name}</span>
                </p>

                <p className="profile">
                    <b>Age: </b>
                    <span>{User.age}</span>
                </p>

                <p className="profile">
                    <b>Email: </b>
                    <span>{User.email}</span>
                </p>

                <p className="profile">
                    <b>Schoolyear: </b>
                    <span>{User.schoolYear}</span>
                </p>

                <p className="profile">
                    <b>subject: </b>
                    <span>{User.subject}</span>
                </p>

                <p className="profile">
                    <b>Bio: </b>
                    <span>{User.bio}</span>
                </p>
            </div>
            <div id="wrapper">
                <Button />
            </div>
        </div>
    );
}

class UserLinks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            class: '',
            place: '+',
            value: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this)

    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleClick() {
        this.setState({
            class: 'input',
            place: ''
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let link = {
            linkId: 4,
            link: this.state.value
        }
        links.push(link);
        this.setState({
            value: ''
        });
    }

    handleBlur() {
        this.setState({
            class: '',
            place: '+',
            value: ''
        });
    }

    handleButtonClick(id, e) {
        //console.log(id);
        let pos = -1;
        for (let index = 0; index < links.length; index++) {
            if (links[index].linkId === id) {
                pos = index;
                console.log(`pos: ${pos}`);
            }
        }
        links.splice(pos,1);
        this.setState({
        });
    }

    render() {
        const linksList = links.map(link => (
            <div className="profileLink" key={link.linkId}><a href={link.link}>{link.link}</a><button onClick={this.handleButtonClick.bind(this, link.linkId)}>delete</button></div>
        ))
        return (
            <div>
                <div className="profileTitle">
                    <b>Links</b>
                    <form onSubmit={this.handleSubmit} onBlur={this.handleBlur}>
                        <input value={this.state.value} onChange={this.handleChange} type="text" className={this.state.class} placeholder={this.state.place} onClick={this.handleClick}>
                        </input>
                    </form>
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
    constructor(props) {
        super(props)
        this.state = {
            class: '',
            place: '+',
            value: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this)
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleClick() {
        this.setState({
            class: 'input',
            place: ''
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let tag = {
            tagId: 4,
            competence: this.state.value
        }
        tags.push(tag);
        this.setState({
            value: ''
        });
    }

    handleBlur() {
        this.setState({
            class: '',
            place: '+',
            value: ''
        });
    }

    handleButtonClick(id, e) {
        //console.log(id);
        let pos = -1;
        for (let index = 0; index < tags.length; index++) {
            if (tags[index].tagId === id) {
                pos = index;
                console.log(`pos: ${pos}`);
            }
        }
        tags.splice(pos,1);
        this.setState({
        });
    }

    render() {
        const competenceList = tags.map(tag => (
            <div className="tags" key={tag.tagId}><span>{tag.competence}</span><button onClick={this.handleButtonClick.bind(this, tag.tagId)}>x</button></div>
        ))
        return (
            <div>
                <div className="profileTitle">
                    <b>Competences</b>
                    <form onSubmit={this.handleSubmit} onBlur={this.handleBlur}>
                        <input value={this.state.value} onChange={this.handleChange} type="text" className={this.state.class} placeholder={this.state.place} onClick={this.handleClick}>
                        </input>
                    </form>
                </div>
                <div className="profileContainer">
                    {competenceList}
                </div>
            </div>
        );
    }
}


class Profile extends React.Component {
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

export default Profile;