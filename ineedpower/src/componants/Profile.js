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


function Button(props) {
    return (
        <NavLink to="/createproject"> <button className="projbutton">Make new project</button></NavLink>
    );
}


class Userdata extends React.Component {
    render() {
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

function Competences() {
    const competenceList = tags.map(tag => (
        <p className="tags" key={tag.tagId}>{tag.competence}</p>
    ))
    return (
        <div>
            <p className="profileTitle"><b>Competences</b></p>
            <div className="profileContainer">
                {competenceList}
            </div>
        </div>
    );
}


class Profile extends React.Component {
    render() {
        return (
            <div>
                <Header version="user" />
                <Userdata></Userdata>
                <MyProjects></MyProjects>
                <Competences></Competences>
            </div>
        );
    }
}

export default Profile;