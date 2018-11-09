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

class Projects extends React.Component {
    
    tagList(project) {
        const tag = <p>Tags: {project.tags}</p>;
        return tag;
    }
    
    getNav(id){
        return `/Projectpage/${id}`
    }

    displayprojects() {
        const listProjects = this.props.projs.map(project => (
            
            <NavLink to={this.getNav(project.projectId)}  key={project.projectId}><div>
                <div className={randomGradient()}>
                <p>{project.projectname}</p>
                <p>by {project.name}</p>
                {this.tagList(project)}
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