import React from 'react';
import Header from '../others/Header';
import '../../css/leaderboard.css';
import { NavLink } from 'react-router-dom'

class DisplayLeaderbordUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            fetched: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/LeaderbordUser/`)
            .then(res => res.json())
            .then(res => this.setState({ users: res, fetched: true }));
    }

    render() {
        if (this.state.fetched) {
            const userList = this.state.users.map((user, index) => (
                <tr key={user.rateduserId}>
                    <td>{index + 1}</td>
                    <td><NavLink to={`/Userpage/#${user.userId}`}>{user.name}</NavLink></td>
                    <td>{user.score}</td>
                </tr>
            ))
            return (
                <div className="leaderboard">
                <div className="box">
                    <h2 className="centerLeaderbordTitle">Rated Users</h2>
                    <table>
                        <thead>
                            <tr>
                                <th width="33.33%">Rank</th>
                                <th width="33.33%">Name</th>
                                <th width="33.33%">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList}
                        </tbody>
                    </table>
                    </div>
                </div>
            );
        }
        else {
            return (
                <p>Scores could not be fetched</p>
            );
        }
    }
}

class DisplayLeaderbordProject extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            fetched: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/LeaderbordProject/`)
            .then(res => res.json())
            .then(res => this.setState({ projects: res, fetched: true }));
    }

    render() {
        if (this.state.fetched) {
            const projectList = this.state.projects.map((project, index) => (
                <tr key={project.projectId}>
                    <td>{index + 1}</td>
                    <td><NavLink to={`/ProjectPage/#${project.projectId}`}>{project.name}</NavLink></td>
                    <td>{project.score}</td>
                </tr>
            ))
            return (
                <div className="leaderboard">
                 <div className="box">
                    <h2 className="centerLeaderbordTitle">Rated Projects</h2>
                    <table>
                        <thead>
                        <tr>
                            <th width="33.33%">Rank</th>
                            <th width="33.33%">Name</th>
                            <th width="33.33%">Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projectList}
                        </tbody>
                    </table>
                    </div>
                </div>
            );
        }
        else {
            return (
                <p>Scores could not be fetched</p>
            );
        }
    }
}

class Leaderbord extends React.Component {
    render() {
        return (
            <div>
                <Header version="Leaderbord"></Header>
                <DisplayLeaderbordUser />
                <DisplayLeaderbordProject />
            </div>
        );
    }
}

export default Leaderbord;