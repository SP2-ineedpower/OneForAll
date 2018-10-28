import React from 'react';
import ContentEditable from "react-contenteditable"; //npm install react-contenteditable
import {NavLink} from 'react-router-dom'
import Header from './Header';
import '../css/createproject.css';

//Deze pagina wordt gebruikt om bestaande projecten te editen en nieuwe projecten aan te maken

const Project =   {   //een dummy project maken om te testen, later wordt dit vervangen met project uit database aleja hopelijk
    projectId: 1,
    name: "I Need Power",
    creatorId: "Bob De Bouwer", //dit kan natuurlijk niet als ID, dient gewoon voor een visuele ondersteuning
    description: "awesome project made by awesome people",
    ended: "false",
    issueId: "laravel werkt niet.", // moet nog besproken worden
    creationDate: "25/10/2018",
    groupsize: "6",
    tags: "c++"
}
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
                    <b>Competences:</b>
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

class EditProjectName extends React.Component{
    constructor() {
        super();
        this.state = {
          html: `<p>I Need Power !</p>`,
          editable: true
        };
    }

    handleChange = evt => {
        this.setState({ html: evt.target.value });
    };

    toggleEditable = () => {
        this.setState({ editable: !this.state.editable });
    };

    render() {
        return (
            <div className="centerProjectdata">

                <div className="projectName">
                    <p>
                        <b>Name of project: </b>
                    </p>
                    <ContentEditable
                        className="editable"
                        tagName="pre"
                        html={this.state.html} // innerHTML of the editable div
                        disabled={!this.state.editable} // use true to disable edition
                        onChange={this.handleChange} // handle innerHTML change
                        onBlur={this.sanitize}
                    />
                </div>
            </div>
        );
    }
}

class EditCreator extends React.Component{

    render() {
        return (
            <div className="centerProjectdata">

                <div className="projectName">
                    <p>
                        <b>Creator/Owner: </b>
                    </p>
                    <p>
                        {Project.creatorId}
                    </p>
                </div>
            </div>
        );
    }
}
class EditCreationDate extends React.Component{

    render() {
        return (
            <div className="centerProjectdata">

                <div className="projectName">
                    <p>
                        <b>Date of creation: </b>
                    </p>
                    <p>
                        {Project.creationDate}
                    </p>
                </div>
            </div>
        );
    }
}

class EditDescription extends React.Component{
    constructor() {
        super();
        this.state = {
          html: `<p>An awesome webapp made by awesome people</p>`,
          editable: true
        };
    }

    handleChange = evt => {
        this.setState({ html: evt.target.value });
    };

    toggleEditable = () => {
        this.setState({ editable: !this.state.editable });
    };

    render() {
        return (
            <div className="centerProjectdata">

                <div className="projectName">
                    <p>
                        <b>Description: </b>
                    </p>
                    <ContentEditable
                        className="editable"
                        tagName="pre"
                        html={this.state.html} // innerHTML of the editable div
                        disabled={!this.state.editable} // use true to disable edition
                        onChange={this.handleChange} // handle innerHTML change
                        onBlur={this.sanitize}
                    />
                </div>
            </div>
        );
    }
}

class EditGroupsize extends React.Component{
    constructor() {
        super();
        this.state = {
          html: `<p>6 members</p>`,
          editable: true
        };
    }

    handleChange = evt => {
        this.setState({ html: evt.target.value });
    };

    toggleEditable = () => {
        this.setState({ editable: !this.state.editable });
    };

    render() {
        return (
            <div className="centerProjectdata">

                <div className="projectName">
                    <p>
                        <b>Groupsize: </b>
                    </p>
                    <ContentEditable
                        className="editable"
                        tagName="pre"
                        html={this.state.html} // innerHTML of the editable div
                        disabled={!this.state.editable} // use true to disable edition
                        onChange={this.handleChange} // handle innerHTML change
                        onBlur={this.sanitize}
                    />
                </div>
            </div>
        );
    }
}

class EditProblem extends React.Component{

    render() {
        return (
            <div className="centerProjectdata">

                <div className="projectName">
                    <p>
                        <b>Problem: </b>
                    </p>
                    <p>
                        {Project.issueId}
                    </p>
                </div>
            </div>
        );
    }
}

class SaveButton extends React.Component{
    render() {
        return (
            <div className="centerSave">
                <p className="spatie">
                    <NavLink to="/Projectpage"><p className="back"><span className="save">SAVE</span></p></NavLink>
                </p>
            </div>
        )
    };
}

class EditProject extends React.Component {
    render() {
        return (
            <div>
                <Header version="newProject" />
                <EditProjectName />
                <EditCreator />
                <EditCreationDate />
                <EditDescription />
                <EditGroupsize />
                <EditProblem />
                <Competences />
                <SaveButton />
            </div>
        );

    }
}

export default EditProject;