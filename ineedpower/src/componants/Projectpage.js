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

const User = {
    userId: 1,
    name: "Nicolas",
    email: "nicolas.pecher@student.ehb.be",
    experience: 0,
    bio: "Ik hou van React",
    schoolYear: "2",
    subject: "dig-x swe",
    age: "19",
    type: "admin"
}

const comments = [
    {
        commentId: 1,
        comment: "react is awesome nibba"
    },
    {
        commentId: 2,
        comment: "react comments zijn hard"
    },
    {
        commentId: 3,
        comment: "react is een pracht van een lelijke parel"
    }
]

class ProjectData extends React.Component{
    render() {
        return(
            <div className="centerDataOfProject">

                <div className="buttonsInProj">
                    <p><span className="buttonEditProj"><a href="mailto:test@test.com">JOIN</a></span></p>

                    <p className="marginButtonEditProj">
<                      NavLink to="/CreateProject"><p className="back"><span className="buttonEditProj">Edit Project</span></p></NavLink>
                    </p>
                </div>

                <p className="paragraafEditProj"><b>Project name:</b></p>
                <span>{projects[0].title}</span>

                <p className="paragraafEditProj"><b>Owner:</b></p>
                <span>{projects[0].owner}</span>

                <p className="paragraafEditProj"><b>Creation Date:</b></p>
                <span>25/10/1998</span>
            
                <p className="paragraafEditProj"><b>Description:</b></p>
                <span>{projects[0].description}</span>

                <p className="paragraafEditProj"><b>Groupsize:</b></p>
                <span>4 members</span>
            
                <p className="paragraafEditProj"><b>Problem:</b></p>
                <span>There are some difficulties to understand react</span>

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

class Comments extends React.Component{
   
    render() {
        return(
            <div>
                <h2 className="titleComments">Comments</h2>
                <hr className="hrComments" />
                <p><i class="fas fa-user approachComment"></i><input className="addCommentEditProj" type="text" placeholder="Add comment"></input></p>
                
                <div className="commentBox">
                    <h4><i class="fas fa-user"></i> {User.name}</h4>
                    <p>{comments[0].comment} <i class="far fa-thumbs-up styleLikeComment"></i></p>
                </div>
    
            </div>
        )
    };
}

class Projectpage extends React.Component {
    render() {
        return (
            <div>
                <Header version="project" />
                <ProjectData />
                <Competences />
                <Comments />
            </div>
        );
    }
}

export default Projectpage;