import React from 'react';
import Header from './Header';
import '../css/leaderboard.css';
import { NavLink } from 'react-router-dom'

class DisplayLeaderbord extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
           users:[],
           fetched: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/Leaderbord/`)
            .then(res => res.json())
            .then(res => this.setState({ users: res, fetched: true }));
    }

    render(){
        if(this.state.fetched) {
            const userList = this.state.users.map((user,index) => (
                <tr key={user.rateduserId}>
                    <td>{index+1}</td>
                    <NavLink to={`/Userpage/#${user.rateduserId}`}>{user.name}</NavLink>
                    <td>{user.score}</td>
                </tr>
            ))
            return(
                <div>
                    <table>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                        {userList}
                    </table>
                </div>
            );
        } 
        else {
            return(
                <p>Scores could not be fetched</p>
            );
        }
    }
}

class Leaderbord extends React.Component{
    render(){
        return(
            <div>
                <Header version="Leaderbord"></Header>
                <DisplayLeaderbord />
            </div>
        );
    }
}

export default Leaderbord;