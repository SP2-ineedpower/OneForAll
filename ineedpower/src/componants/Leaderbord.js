import React from 'react';
import Header from './Header';

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
            //console.log(this.state.users);
    }

    render(){
        return(
            <div>
                <p>test</p>
            </div>
        );
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