import React from 'react';
import Rating from './Rating';
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
        this.onClick = this.onClick.bind(this);       
    }

    componentDidMount() {
        fetch(this.props.fetch)
            .then(res => res.json())
            .then(res => this.setState({ users: res, fetched: true })); 
    }

    onClick(deleteId,e) {
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

    componentWillReceiveProps(nextProps) {
        fetch(nextProps.fetch)
            .then(res => res.json())
            .then(res => this.setState({ users: res, fetched: true }));
    }

    delete(id) {
        let delIcon = "";
        if (this.props.edit) {  //aangeven of dit component editable mag zijn : indien wel => props edit sturen die true is
            delIcon = <i className="fas fa-minus-circle fa-2x del" onClick={this.onClick.bind(this, id)}></i>
        }
        return delIcon;
    }

    rating(id) {
        let rating = "";
            if (this.props.edit) {  //aangeven of dit component editable mag zijn : indien wel => props edit sturen die true is
                rating = <Rating userId={id} projectId={this.props.id}></Rating>;
            }
        return rating;
    }

    render() {
        if (this.state.fetched) {
            const userList = this.state.users.map(user => (
                <div className="participantContainer" key={user.participantId} >
                    {this.delete(user.participantId)}
                    <div className="participantIcon">
                        <i className="fas fa-user-circle fa-4x"></i>
                    </div>
                    <NavLink key={user.participantId} to={`/Userpage/#${user.participantId}`}>{user.name}</NavLink>
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