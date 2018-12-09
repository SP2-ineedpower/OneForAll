import React from 'react';
import Header from './Header';
import ProjectPopup from './ProjectPopup';
import '../css/makenewproject.css';

class NewProjectData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            groupsize: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(e) {
        this.setState({
            name: this.refs.name.value,
            description: this.refs.description.value,
            groupsize: this.refs.groupsize.value
        });
        console.log(this.props.id);
    }

    handleSubmit(event) {
        event.preventDefault();
        const name = this.state.name;
        const description = this.state.description;
        const groupsize = this.state.groupsize;
        fetch(`http://localhost:5000/project/add`, {
            method: 'POST',
            body: JSON.stringify({
                "name": name,
                "description": description,
                "groupsize": groupsize,
                "creatorId": this.props.id
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        this.props.save();
    }


    render() {
        return (
            <div className="newProject">
                <div className="container">
                    <h2>Creating Project</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div><span>Project name:</span> <input className="pNameInput" type="text" ref="name" onChange={this.update.bind(this)} required></input></div><br />
                        <span>Description: </span><br />
                        <textarea rows="4" cols="40" ref="description" onChange={this.update.bind(this)} required></textarea><br />
                        <div><span>Amount of participants:</span> <input className="pParticipantsInput" type="text" ref="groupsize" onChange={this.update.bind(this)} required></input></div><br />
                        <p>links, tags, participants and eventual problems can be added via the edit project
                        button that will appear on the page of your project.</p>
                        <button className="pSave" type="submit">Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

class NewProject extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            saved: false
        }
        this.updateSave = this.updateSave.bind(this);
    }

    componentDidMount() {
        fetch(`http://localhost:5000/users/${this.props.location.hash.substr(1)}`)
            .then(res => res.json())
            .then(res => this.setState({ user: res[0], fetched: true }));
    }

    updateSave() {
        this.setState({
            saved: true
        });
    }

    render() {
        if (this.state.saved) {
            return (
                <div>
                    <Header version="newproject"></Header>
                    <ProjectPopup></ProjectPopup>
                </div>
            );
        }
        return (
            <div>
                <Header version="newproject"></Header>
                <NewProjectData id={this.state.user.userId} save={this.updateSave} />
            </div>
        );
    }
}

export default NewProject;