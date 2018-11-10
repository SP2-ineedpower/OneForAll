import React from 'react';
import {NavLink} from 'react-router-dom'
import '../css/project.css';


//generates a random class to generate a random background gradient
const randomGradient = function() {
    let gradient = '';
    const number = Math.floor((Math.random() * 18) + 1);
    switch(number) {
        case 1:gradient = 'spotify';
        break;
        case 2:gradient = 'trump';
        break;
        case 3:gradient = 'dejaVu';
        break;
        case 4:gradient = 'caesar';
        break;
        case 5:gradient = 'edisons';
        break;
        case 6:gradient = 'instagram';
        break;
        case 7:gradient = 'freeFood';
        break;
        case 8:gradient = 'soda';
        break;
        case 9:gradient = 'homeless';
        break;
        case 10:gradient = 'battery';
        break;
        case 11:gradient = 'login';
        break;
        case 12:gradient = 'kennedy';
        break;
        case 13:gradient = 'chance';
        break;
        case 14:gradient = 'duck';
        break;
        case 15:gradient = 'organic';
        break;
        case 16:gradient = 'dragon';
        break;
        case 17:gradient = 'warm';
        break;
        case 18:gradient = 'red';
        break;
        default:gradient = '';
    }
    return gradient + " projectback";
}

class ProjectTags extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: {},
            fetched:false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/projecttags/${this.props.id}`)
            .then(res => res.json())
            .then(res => this.setState({ tags: res, fetched: true }));
    }

    render() {
        if (this.state.fetched) {
            const tagList = this.state.tags.map(tag => (
                <span key={tag.tagId}>{tag.tag} </span>))
            return (
                <p>tags: {tagList}</p>
            )
        } else {
            return(
                <p>tags: </p>
            );
        }
    }
}

class ProjectOwner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            owner: "",
            fetched:false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/projectowner/${this.props.id}`)
            .then(res => res.json())
            .then(res => this.setState({ owner: res[0], fetched: true }));
    }


    render() {
        if (this.state.fetched) {
            console.log(this.state.owner)
            return <p>by {this.state.owner.name}</p>;
        } else {
            return <p>by </p>;
        }
        
    };
}


class Projects extends React.Component {
    
    
    getNav(id){
        return `/Projectpage/${id}`
    }

    displayprojects() {
        const listProjects = this.props.projs.map(project => (
            <NavLink to={this.getNav(project.projectId)}  key={project.projectId}><div>
                <div className={randomGradient()}>
                <p>{project.projectname}</p>
                <ProjectOwner id={project.projectId}/>
                <ProjectTags id={project.projectId}/>
                </div>
            </div></NavLink>
        ))
        return listProjects;
    }

    render() {
        return (
            <div>
                {this.displayprojects()}
            </div>
        );
    }
}

export default Projects;