import React from 'react';
import {NavLink} from 'react-router-dom'
import Header from './Header';
import Projects from './Projects';
import '../css/projectpage.css';

const projects = [
    {
        id: 1,
        title: "Ineedpower",
        owner: "nicolas pecher",
        description:"an awesome project for the good of students",
        tags: "c++"
    }, {
        id: 2,
        title: "PowerneedI",
        owner: "piet piraat",
        tags: "js"
    }
];

const tags = [ //dummy tags
    {
        tagId: 1,
        competence: "test"
    }, {
        tagId: 2,
        competence: "c++"
    }, {
        tagId: 3,
        competence: "java"
    },
    {
        tagId: 4,
        competence: "docker"
    },
    {
        tagId: 5,
        competence: "python"
    },
    {
        tagId: 6,
        competence: "ruby"
    },
    {
        tagId: 7,
        competence: "react"
    }
]

function MyProjects() {
    return (
        <div>
            <p className="profileTitle"><b>Projects</b></p>
            <div className="profileContainer">
                <Projects projs={projects}></Projects>
            </div>
        </div>
    );
}

class ProjectData extends React.Component{
    render() {
        return(
            <div className="centerData">
                <p><b>Project name:</b></p>
                <span>{projects[0].title}</span>
            
                <p><b>Description:</b></p>
                <span>{projects[0].description}</span>
            
                <p><b>Problem:</b></p>
                <span>There are some difficulties to understand german</span>

                <p><span className="button"><a href="mailto:test@test.com">stuur mail naar project</a></span></p>

                <p className="marginButton">
                <NavLink to="/CreateProject"><p className="back"><span className="button">Edit Project</span></p></NavLink>
                </p>

            </div>
        )
    };
}

class Competences extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            class: '',
            place: '+',
            value: ''
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

    handleClick() {
        this.setState({
            class: 'input',
            place: ''
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let tag = {
            tagId: 4,
            competence: this.state.value
        }
        tags.push(tag);
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
        let pos = -1;
        for (let index = 0; index < tags.length; index++) {
            if (tags[index].tagId === id) {
                pos = index;
                console.log(`pos: ${pos}`);
            }
        }
        tags.splice(pos,1);
        this.setState({
        });
    }

    render() {
        const competenceList = tags.map(tag => (
            <div className="tags" key={tag.tagId}><span>{tag.competence}</span><button onClick={this.handleButtonClick.bind(this, tag.tagId)}>x</button></div>
        ))
        return (
            <div>
                <div className="importantCompetences">
                    <b>Tags:</b>
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


class Projectpage extends React.Component {
    render() {
        return (
            <div>
                <Header version="project" />
                <MyProjects />
                <ProjectData />
                <Competences />
            </div>
        );
    }
}

export default Projectpage;