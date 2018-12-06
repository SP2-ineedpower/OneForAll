import React from 'react';
import RatingUser from './Rating';
import { NavLink } from 'react-router-dom'
import '../css/users.css';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [], //er zitten participants hierbinnen
            projectId: this.props.id,
            fetched: false
        }
        this.onClick = this.handleDelete.bind(this);  
        this.onClick = this.handleAccept.bind(this);      
    }

    componentDidMount() {
        fetch(this.props.fetch)
            .then(res => res.json())
            .then(res => this.setState({ users: res, fetched: true })); 
    }

    handleDelete(deleteId,e) {
        const projectId = this.state.projectId;
        fetch(`http://localhost:5000/participants/delete/`, {
            method: 'POST',
            body: JSON.stringify({
                "participantId": deleteId,
                "projectId": projectId
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        let pos = -1;
        for (let index = 0; index < this.state.users.length; index++) {
            if (this.state.users[index].userId === deleteId) {
                pos = index;
            }
        }
        this.state.users.splice(pos, 1);
        this.setState({
        });
    }

    handleAccept(participantrequestId,event){
        event.preventDefault();
        let posi = -1;
        for (let index = 0; index < this.state.participantrequest.length; index++) {
            if (this.state.participantrequest[index].participantrequestId === participantrequestId) {
                posi = index;
            }
        }
        const toBecomeParticipant = this.state.participantrequest[posi]
        fetch(`http://localhost:5000/participants/add/`, {
            method: 'POST',
            body: JSON.stringify({
                "userId": toBecomeParticipant.userId,
                "projectId": this.props.id
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        //functie die participantrequest gaat delete
        this.deleteParticipantFromParticipantRequest(toBecomeParticipant.participantrequestId);

        let pos = -1;
        for (let index = 0; index < this.state.participantrequest.length; index++) {
            if (this.state.participantrequest[index].participantrequestId === participantrequestId) {
                pos = index;
            }
        }
        this.state.participantrequest.splice(pos, 1);
        this.setState({
        });
    }

    componentWillReceiveProps(nextProps) {
        fetch(nextProps.fetch)
            .then(res => res.json())
            .then(res => this.setState({ users: res, fetched: true }));
    }

    delete(id) {
        let delIcon = "";
        if (this.props.edit) {  //aangeven of dit component editable mag zijn : indien wel => props edit sturen die true is
            delIcon = <i className="fas fa-minus-circle fa-2x del" onClick={this.handleDelete.bind(this, id)}></i>
        }
        return delIcon;
    }

    accept(id) {
        let accIcon = "";
        if (this.props.edit && this.props.request) {  //aangeven of dit component editable mag zijn : indien wel => props edit sturen die true is
            accIcon = <i class="fas fa-check-circle fa-2x accept" onClick={this.handleAccept.bind(this, id)}></i>
        }
        return accIcon;
    }

    rating(id) {
        const ownerId = this.props.ownerId;
        let rating = "";
            if (this.props.edit) {  //aangeven of dit component editable mag zijn : indien wel => props edit sturen die true is
                rating = <RatingUser userId={id} projectId={this.props.id} ownerId={ownerId}></RatingUser>;
            }
        return rating;
    }

    render() {
        if (this.state.fetched) {
            const userList = this.state.users.map(user => (
                <div className="participantContainer" key={user.userId} >
                    {this.delete(user.participantId)}
                    {this.accept(user.participantId)}
                    <div className="participantIcon">
                        <i className="fas fa-user-circle fa-4x"></i>
                    </div>
                    <NavLink key={user.userId} to={`/Userpage/#${user.userId}`}>{user.name}</NavLink>
                    {this.rating(user.userId)}
                </div>
            ));
            return (
                <div>
                    <div className="profileTitle">
                        <b>{this.props.title}</b>
                    </div>
                    <div className="profileContainer">
                        {userList}
                    </div>
                </div>
            );
        } else {
            return (
                <p></p>
            );
        }
    }
}

export default Users;