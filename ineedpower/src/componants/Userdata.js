import React from 'react';
import pencil from '../pictures/pencil.svg';
import { NavLink } from 'react-router-dom';

function Button(props) {
    if (props.active) {
        return (
            <NavLink to="/createproject"> <button className="projbutton">Make new project</button></NavLink>
        );
    }
}


class InputProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            class: '',
            value: this.props.value,
            updated: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        // let link = {
        //     linkId: 4,
        //     link: this.state.value
        // }
        // links.push(link);
        this.setState({
            value: ''
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value });
    }

    render() {
        if (this.props.textarea === "true") {
            return (
                <form>
                    <label>
                        <textarea value={this.state.value} onChange={this.handleChange} className="profiletextarea"></textarea>
                    </label>
                </form>
            );
        }
        if (this.props.type === "text") {
            return (
                <form className="profileInput">
                    <label>
                        <input value={this.state.value} onChange={this.handleChange} type={this.props.type} className="textinput"></input>
                        <img src={pencil} alt="edit button" className="pencil" />
                    </label>
                </form>
            );
        }
        return (
            <form className="profileInput">
                <label>
                    <input value={this.state.value} onChange={this.handleChange} type="text"></input>
                    <img src={pencil} alt="edit button" className="pencil" />
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
        console.log(this.props.owner);
        if (this.props.owner) {
            return (
                <div className="grid-userdata">
                    <div className="padding">
                            <p className="profile">
                                <b>Name: </b>
                                <span>{this.state.User.name}</span>
                            </p>

                            <p className="profile">
                                <b>Email: </b>
                                <span>{this.state.User.email}</span>
                            </p>
                        <div className="profile">
                            <b>Age: </b>
                            <InputProfile value={usr.age} type="number"></InputProfile>

                        </div>

                        <div className="profile">
                            <b>Field of study: </b>
                            <InputProfile value={usr.subject} type="text"></InputProfile>
                        </div>

                        <div className="profile">
                            <b>Bio: </b>
                            <InputProfile value={usr.bio} textarea="true"></InputProfile>
                        </div>
                    </div>
                    <div id="wrapper">
                        <Button active={true} />
                    </div>
                </div>
            );
        } else {
            // return (
            //     <div className="grid-userdata">
            //         <div className="padding">

            //             <p className="profile">
            //                 <b>Name: </b>
            //                 <span>{this.state.User.name}</span>
            //             </p>

            //             <p className="profile">
            //                 <b>Email: </b>
            //                 <span>{this.state.User.email}</span>
            //             </p>

            //             <div className="profile">
            //                 <b>Age: </b>
            //                 <span>{usr.age}</span>
            //             </div>

            //             <div className="profile">
            //                 <b>Field of study: </b>
            //                 <span>{usr.subject}</span>
            //             </div>

            //             <div className="profile">
            //                 <b>Bio: </b>
            //                 <span>{usr.bio}</span>
            //             </div>
            //         </div>
            //     </div>
            // );
        }

    }
}

export default Userdata;
