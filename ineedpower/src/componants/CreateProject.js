import React from 'react';
import ReactDOM from "react-dom";
import ContentEditable from "react-contenteditable"; //npm install react-contenteditable
import sanitizeHtml from "sanitize-html"; //npm install react-sanitized-html sanitize-html --save
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

class Projectdata extends React.Component {

    constructor() {
        super();
        this.state = {
          html: `<p>Click to edit</p>`,
          editable: true
        };
    }

    handleChange = evt => {
        this.setState({ html: evt.target.value });
    };

    toggleEditable = () => {
        this.setState({ editable: !this.state.editable });
    };
    
      /*sanitizeConf = {
        allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
        allowedAttributes: { a: ["href"] }
      };
    
      sanitize = () => {
        this.setState({ html: sanitizeHtml(this.state.html, this.sanitizeConf) });
      };*/

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

                <div className="creator">
                    <p>
                        <b>Creator/Owner: </b>
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

                <div className="creationDate">
                    <p>
                        <b>Creation Date: </b>
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

                <div className="description">
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

                <div className="groupSize">
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

                <div className="problem">
                    <p>
                        <b>Problem: </b>
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

    render() {
        const competenceList = tags.map(tag => (
            <p className="tags" key={tag.tagId}>{tag.competence}</p>
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

class SaveButton extends React.Component{
    render() {
        return (
            <div className="centerSave">
                <p className="spatie">
                    <span className="save">SAVE</span>
                </p>
            </div>
        )
    };
}

class EditProjectName extends React.Component{
    constructor() {
        super();
        this.state = {
          html: `<p>Click to edit</p>`,
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
    constructor() {
        super();
        this.state = {
          html: `<p>Click to edit</p>`,
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
                        <b>Creator/Owner: </b>
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
class EditCreationDate extends React.Component{
    constructor() {
        super();
        this.state = {
          html: `<p>Click to edit</p>`,
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
                        <b>Date of creation: </b>
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

class EditDescription extends React.Component{
    constructor() {
        super();
        this.state = {
          html: `<p>Click to edit</p>`,
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
          html: `<p>Click to edit</p>`,
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
    constructor() {
        super();
        this.state = {
          html: `<p>Click to edit</p>`,
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
                        <b>Problem: </b>
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