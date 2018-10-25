import React from 'react';
import Header from './Header';
import { NavLink } from 'react-router-dom'
import '../css/profile.css';

const User = {
    userId: 1,
    name: "Nicolas",
    email: "nicolas.pecher@student.ehb.be",
    experience: 0,
    bio: "oppai",
    schoolYear: "2",
    subject: "dig-x swe",
    age: "19",
    type: "admin"
}

const projects = [
    {
        id: 1,
        title: "Ineedpower",
        owner: "nicolas",
        tags: "c++"
    }, {
        id: 2,
        title: "PowerneedI",
        owner: "piet piraat",
        tags: "js"
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



class MyProjects extends React.Component {

    getprojects(projects) {

      projects.forEach(project => {
           console.log(project.title);
        });
    }
    render() {
        return (
            <div>
                <p className="padding myprojects"><b>Projecten</b></p>
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
                <MyProjects></MyProjects>
                <h1>This is the active user page</h1>
            </div>
        );
    }
}

export default Profile;