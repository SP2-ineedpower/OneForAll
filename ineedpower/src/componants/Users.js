import React from 'react';
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

    onClick() {
        // hier code implementeren op participant te verwijderen
    }

    componentWillReceiveProps(nextProps) {
        fetch(nextProps.fetch)
            .then(res => res.json())
            .then(res => this.setState({ users: res, fetched: true }));
    }

    render() {
        if (this.state.fetched) {
            let delIcon = "";
            if(this.props.edit) {  //aangeven of dit component editable mag zijn : indien wel => props edit sturen die true is
                delIcon = <i class="fas fa-minus-circle fa-2x del" onClick={this.onClick}></i>
            }
            const userList = this.state.users.map(user => (
                <NavLink key={user.userId} to={`/Userpage/#${user.userId}`}>
                    <div className="participantContainer" >
                        {delIcon}
                        <div className="participantIcon">
                            <i className="fas fa-user-circle fa-4x"></i>
                        </div>
                        <p>{user.name}</p>
                    </div>
                </NavLink>
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