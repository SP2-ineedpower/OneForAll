import React from 'react';
import {NavLink} from 'react-router-dom'
import '../css/project.css';


//generates a random class to generate a random background gradient
const randomGradient = function() {
    let gradient = '';
    const number = Math.floor((Math.random() * 8) + 1);
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
        console.log(id);
        //return `/Projectpage/${id}`
    }

    displayprojects() {
        const listProjects = this.props.projs.map(project => (
            
            <NavLink to={this.getNav(project.projectId)}  key={project.projectId}><div>
                <div className={randomGradient()}>
                <p>{project.name}</p>
                <p>by {project.creatorId}</p>
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