import React from 'react';
import pencil from '../../pictures/pencil.svg';
import { NavLink } from 'react-router-dom';

class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    getNav(id){
        return `/MakeNewProject/`
    }
    render() {
        return (
            <NavLink to={this.getNav()} className="projbutton">Make new project</NavLink>
        );
    }
}

class StudyField extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value,
            updated: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.submit();
    }

    submit() {
        const subject = this.state.value;
        fetch(`http://localhost:5000/user/studies`, {
            method: 'POST',
            body: JSON.stringify({
                "studies": subject,
                "id": this.props.id
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value });
    }

    render() {
        return (
            <form className="profileInput" onSubmit={this.handleSubmit} onBlur={this.submit}>
                <label>
                    <input value={this.state.value} onChange={this.handleChange} type={this.props.type} className="textinput"></input>
                    <img src={pencil} alt="edit button" className="pencil" />
                </label>
            </form>
        );
    }

}

class Bio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value,
            updated: false,
            class:""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(`http://localhost:5000/user/bio`, {
            method: 'POST',
            body: JSON.stringify({
                "bio": this.state.value,
                "id": this.props.id
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        this.setState({
            class:"green"
        })

    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="bio">
                <label>
                    <textarea value={this.state.value} onChange={this.handleChange} className="profiletextarea" name="bio"></textarea>
                    <button type="submit" className={this.state.class}>save</button>
                </label>
            </form>
        );
    }
}



class Userdata extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            User: this.props.user
        }
    }

    render() {
        const usr = this.state.User;
        if (this.props.owner) {
            return (
                <div className="grid-userdata">
                    <div className="padding">
                        <p className="profileTitle">
                            <b>Personal Data</b>
                        </p>
                        <div>
                            <p className="profile">
                                <b>Name: </b>
                                <span>{this.state.User.name}</span>
                            </p>

                            <p className="profile">
                                <b>Email: </b>
                                <span>{this.state.User.email}</span>
                            </p>
        
                            <div className="profile">
                                <b>Field of study: </b>
                                <StudyField value={usr.subject} id={usr.userId} type="text"></StudyField>
                            </div>

                            <div className="profile">
                                <b>Bio: </b>
                                <Bio value={usr.bio} textarea="true" id={usr.userId}></Bio>
                            </div>
                        </div>
                    </div>
                    <div id="wrapper">
                        <Button id={usr.userId} active={true} />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="grid-userdata">
                    <div className="padding">
                        <p className="profileTitle">
                            <b>Personal Data</b>
                        </p>
                        <p className="profile">
                            <b>Name: </b>
                            <span>{this.state.User.name}</span>
                        </p>

                        <p className="profile">
                            <b>Email: </b>
                            <span>{this.state.User.email}</span>
                        </p>

                        <div className="profile">
                            <b>Field of study: </b>
                            <span>{usr.subject}</span>
                        </div>

                        <div className="profile">
                            <b>Bio: </b>
                            <span>{usr.bio}</span>
                        </div>
                    </div>
                </div>
            );
        }

    }
}

export default Userdata;
