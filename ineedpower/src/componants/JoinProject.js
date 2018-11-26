import React from 'react';
import Header from './Header';
import '../css/joinproject.css';

const actifUser = {
    userId: 6
}

class YesButton extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            project: this.props.project,
            //fetched: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
       const userId = actifUser.userId;

        fetch(`http://localhost:5000/participantrequest/add/`, {
            method: 'POST',
            body: JSON.stringify({
                "userId": userId,
                "projectId": this.state.project.projectId,
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

    render(){
        return(
            <button className="YesButtonJoin" onClick={this.handleClick}>Yes</button>
        );
    }
}

class JoinProject extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            project: {},
            fetched: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/displayProject/${this.props.location.hash.substr(1)}`)
            .then(res => res.json())
            .then(res => this.setState({ project: res[0], fetched: true }));
    }

    render(){
        if(this.state.fetched){
            return(
                <div>
                    <Header version="JoinProject" />
                    <div className="centerJoinProjectData">
                        <p className="GroterFont">Would you like to join {this.state.project.name}?</p>
                        <YesButton project={this.state.project}/>
                    </div>
                </div>
            )
        }
        else{
            return(
                <p>Project could not be fetched</p>
            );
        }
    }
}

export default JoinProject;