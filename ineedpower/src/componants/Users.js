import React from 'react';
import Rating from './Rating';
import { NavLink } from 'react-router-dom'
import '../css/users.css';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            fetched: false
        }
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        fetch(this.props.fetch)
            .then(res => res.json())
            .then(res => this.setState({ users: res, fetched: true }));
    }

    onClick(e,deleteId) {
        fetch(`http://localhost:5000/participants/delete/`, {
            method: 'POST',
            body: JSON.stringify({
                "participantId": deleteId,
                "projectId":this.props.id
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
            delIcon = <i class="fas fa-minus-circle fa-2x del" onClick={this.onClick.bind(this, id)}></i>
        }
        return delIcon;
    }

    rating(id) {
        let rating = "";
            if (this.props.edit) {  //aangeven of dit component editable mag zijn : indien wel => props edit sturen die true is
                rating = <Rating userId={id}></Rating>;
            }
        return rating;
    }

    render() {
        if (this.state.fetched) {
            const userList = this.state.users.map(user => (
                <div className="participantContainer" >
                    {this.delete(user.userId)}
                    <div className="participantIcon">
                        <i className="fas fa-user-circle fa-4x"></i>
                    </div>
                    <NavLink key={user.userId} to={`/Userpage/#${user.userId}`}><p>{user.name}</p></NavLink>
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