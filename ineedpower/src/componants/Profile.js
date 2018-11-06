import React from 'react';
import Header from './Header';
import Projects from './Projects';
import { NavLink } from 'react-router-dom'
import '../css/profile.css';
import pencil from '../pictures/pencil.svg';


function Button(props) {
    return (
        <NavLink to="/createproject"> <button className="projbutton">Make new project</button></NavLink>
    );
}

class InputProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            class: '',
            value: this.props.value,
            updated:false
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

class Userdata extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            User: {}
        }
    }


    componentDidMount() {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(res => this.setState({ User: res.data[0]}, () => console.log('user fetched', res)));
    }


    render() {
        const usr = this.state.User;
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
                <Button />
            </div>
        </div>
    );
    }
}

class UserLinks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            class: '',
            place: '+',
            value: '',
            links:{},
            fetched:false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this)

    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    componentDidMount() {
        fetch('http://localhost:5000/userLinks')
            .then(res => res.json())
            .then(res => this.setState({ links: res.data, fetched:true }, () => console.log('links fetched', res)));
    }

    handleClick() {
        this.setState({
            class: 'input',
            place: ''
        })
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

    handleBlur() {
        this.setState({
            class: '',
            place: '+',
            value: ''
        });
    }

    handleButtonClick(id, e) {
        //console.log(id);
        // let pos = -1;
        // for (let index = 0; index < links.length; index++) {
        //     if (links[index].linkId === id) {
        //         pos = index;
        //     }
        // }
        // links.splice(pos, 1);
        // this.setState({
        // });
    }

    showLinks(){
        if (this.state.fetched) {
            const linksList = this.state.links.map(link => (
                <div className="profileLink" key={link.userLinkId}><a href={link.url}>{link.url}</a><button onClick={this.handleButtonClick.bind(this, link.linkId)}>delete</button></div>
            ))
            return linksList;
        } else {
            return <p>data can't be fetched</p>
        }
    }

    render() {
        return (
            <div>
                <div className="profileTitle">
                    <b>Links</b>
                    <form onSubmit={this.handleSubmit} onBlur={this.handleBlur}>
                        <input value={this.state.value} onChange={this.handleChange} type="text" className={this.state.class} placeholder={this.state.place} onClick={this.handleClick}>
                        </input>
                    </form>
                </div>
                <div className="profileContainer">
                    {this.showLinks()}
                </div>
            </div>
        );
    }
}

class MyProjects extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            fetched: false
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/userprojects')
            .then(res => res.json())
            .then(res => this.setState({ projects: res.data, fetched:true }, () => console.log('projects fetched', res)));
    }

    render() {
        if (this.state.fetched) {
            return (
                <div>
                    <p className="profileTitle"><b>Projects</b></p>
                    <div className="profileContainer">
                        <Projects projs={this.state.projects} ></Projects>
                    </div>
                </div>
            );
        } else {
           return <p>projects can't be fetched</p>
        }
    }
    
}

class Competences extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            class: '',
            place: '+',
            value: '',
            competences:{},
            fetched: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this)
    }

    componentDidMount() {
        fetch('http://localhost:5000/userCompetences')
            .then(res => res.json())
            .then(res => this.setState({ competences: res.data,fetched:true }, () => console.log('competences fetched', res)));
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleClick() {
        this.setState({
            class: 'input',
            place: ''
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        // let tag = {
        //     tagId: 4,
        //     competence: this.state.value
        // }
        // tags.push(tag);
         this.setState({
            value: ''
        });
    }

    handleBlur() {
        this.setState({
            class: '',
            place: '+',
            value: ''
        });
    }

    handleButtonClick(id, e) {
        //console.log(id);
        // let pos = -1;
        // for (let index = 0; index < tags.length; index++) {
        //     if (tags[index].tagId === id) {
        //         pos = index;
        //     }
        // }
        // tags.splice(pos, 1);
        // this.setState({
        // });
    }

    render() {
        let competenceList = ''
        if (this.state.fetched) {
            competenceList = this.state.competences.map(competence => (
                <div className="tags" key={competence.competenceId}><span>{competence.competence}</span><button onClick={this.handleButtonClick.bind(this, competence.competenceId)}>x</button></div>
            ))
        }
        return (
            <div>
                <div className="profileTitle">
                    <b>Competences</b>
                    <form onSubmit={this.handleSubmit} onBlur={this.handleBlur}>
                        <input value={this.state.value} onChange={this.handleChange} type="text" className={this.state.class} placeholder={this.state.place} onClick={this.handleClick}>
                        </input>
                    </form>
                </div>
                <div className="profileContainer">
                    {competenceList}
                </div>
            </div>
        );
    }
}


class Profile extends React.Component {
    render() {
        return (
            <div>
                <Header version="user"></Header>
                <Userdata></Userdata>
                <UserLinks></UserLinks>
                <MyProjects></MyProjects>
                <Competences></Competences>
            </div>
        );
    }
}

export default Profile;