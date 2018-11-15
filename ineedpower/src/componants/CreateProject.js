import React from 'react';
import {NavLink} from 'react-router-dom'
import Header from './Header';
import '../css/createproject.css';

//Deze pagina wordt gebruikt om bestaande projecten te editen en nieuwe projecten aan te maken

const problems = [
    {
        problemId: 1,
        problem:'page not loading',
        solved : false
    }, {
        problemId: 2,
        problem:'link with database not working',
        solved : false
    }
    , {
        problemId: 3,
        problem:'difficulties with fetching data',
        solved : false
    }
]

class Tags extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            class: '',
            place: '+',
            value: '',
            tags: {},
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
        this.state.tags.push(tag);
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
        let pos = -1;
        for (let index = 0; index < this.state.tags.length; index++) {
            if (this.state.tags[index].tagId === id) {
                pos = index;
            }
        }
        this.state.tags.splice(pos,1);
        this.setState({
        });
    }

    componentDidMount() {
        fetch(`http://localhost:5000/projecttags/${this.props.id}`)
            .then(res => res.json())
            .then(res => this.setState({ tags: res, fetched:true }));
    }

    render() {
        if (this.state.fetched) {
            const competenceList = this.state.tags.map(tag => (
                <div className="tags" key={tag.tagId}><span>{tag.tag}</span><button onClick={this.handleButtonClick.bind(this, tag.tagId)}>x</button></div>
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
        } else {
            return <p>data can not be fetched</p>
        }
        
    }
}

class EditProjectName extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            projName: this.props.name,
            value:this.props.name
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    handleChange(event){
        this.setState({
            value: event.target.value
        });
    }
    handleSubmit(event){
        event.preventDefault();
        this.setState({
            value: event.target.value
        });
    }   

    render() {
    
        return (
            <div className="centerProjectdata">

                <div className="projectName">
                    <p>
                        <b>Name of project: </b>
                    </p>
                    <form onSubmit={this.handleSubmit}>
                        <p>
                        <input type="text" placeholder="I Need Power" value={this.state.value} onChange={this.handleChange}></input>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

class EditDescription extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            projDesc: this.props.description,
            value:this.props.description,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    handleChange(event){
        this.setState({
            value: event.target.value
        });
    }
    handleSubmit(event){
        event.preventDefault();
        this.setState({
            value: event.target.value
        });
    }   

    render() {
        return (
            <div className="centerProjectdata">

                <div className="projectName">
                    <p>
                        <b>Description: </b>
                    </p>
                    <form onSubmit={this.handleSubmit}>
                        <p>
                        <input type="text" value={this.state.value} onChange={this.handleChange}></input>
                        </p>
                    </form>
                    
                </div>
            </div>
        );
    }
}

class EditGroupsize extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            projSize: this.props.groupsize,
            value:this.props.groupsize,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    handleChange(event){
        this.setState({
            value: event.target.value
        });
    }
    handleSubmit(event){
        event.preventDefault();
        this.setState({
            value: event.target.value
        });
    }   
    
    render() {
        return (
            <div className="centerProjectdata">

                <div className="projectName">
                    <p>
                        <b>Groupsize: </b>
                    </p>
                    <form onSubmit={this.handleSubmit}>
                        <p>
                        <input type="text" value={this.state.value} onChange={this.handleChange}></input>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

class Problems extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value:"",
            problems:{}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleChange(event){
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        const problem = {
            problemId:4,
            problem:this.state.value
        }
        problems.push(problem);
        this.setState({
            value:""
        });
    }    

    render() {
        const ProblemList = problems.map(problem => (
            <div className="problemBox" key={problem.problemId}>
                <p>{problem.problem}</p>
            </div>
        ))
        return (
            
            <form onSubmit={this.handleSubmit}>
                <h2 className="titleComments">Problems</h2>
                <p><i className="fas fa-user approachComment"></i>
                <input className="addProblemEditProj" type="text" placeholder="Add Problem" value={this.state.value} onChange={this.handleChange}></input>
                </p>
                {ProblemList}
            </form>
        )
    };

}

class EditParticipants extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value:"",
            participants: [],
            fetched: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event){
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        const participant = {
            participantId:4,
            name:this.state.value
        }
        this.state.participant.push(participant);
        this.setState({
            value:""
        });
    }

    handleClick(id,event){
        let pos = -1;
        for (let index = 0; index < this.state.participant.length; index++) {
            if (this.state.participant[index].participantId === id) {
                pos = index;
            }
        }
        this.state.participant.splice(pos, 1);
        this.setState({
        });
    }

    componentDidMount() {
        fetch(`http://localhost:5000/project/participants/${this.props.id}`)
            .then(res => res.json())
            .then(res => this.setState({ participants: res, fetched:true }));
    }
    render() {

        console.log(this.state.participants);

        if(this.state.fetched){
            const participantList = this.state.participants.map(participant => (
                <div className="participantBox" key={participant.participantId}>
                    <i className="fas fa-user userIconEditParticipant"></i><p className="centerNameParticipant">{participant.name} <i className="fas fa-trash-alt participantDeleteIcon" onClick={this.handleClick.bind(this, participant.participantId)}></i></p>
                </div>
            ))
    
                return (
                    <form onSubmit={this.handleSubmit}>
                        <h2 className="titleComments">Participants</h2>
                        <i className="fas fa-user approachComment"></i><input type="text" placeholder="add participant" className="marginInputParticipant" value={this.state.value} onChange={this.handleChange}></input>
                        {participantList}
                    </form>
                )
        } else{
            return(
                <p>participants could not be fetched</p>
            )
        }
    };
}

class SaveButton extends React.Component{
    render() {
        return (
            <div className="centerSave">
                <div className="spatie">
                    <NavLink to="/OwnerProjectPage"><div className="back"><span className="save">SAVE</span></div></NavLink>
                </div>
            </div>
        )
    };
}

class ProjectLinks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            class: '',
            place: '+',
            value: '',
            links: {},
            fetched: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this)
    }

    componentDidMount() {
        fetch(`http://localhost:5000/projectlinks/${this.props.id}`)
            .then(res => res.json())
            .then(res => this.setState({ links: res, fetched:true }));
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
        let link = {
            linkId: 4,
            link: this.state.value
        }
        this.state.links.push(link);
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
        let pos = -1;
        for (let index = 0; index < this.state.links.length; index++) {
            if (this.state.links[index].linkId === id) {
                pos = index;
            }
        }
        this.state.links.splice(pos, 1);
        this.setState({
        });
    }

    render() {
        
        if (this.state.fetched) {
            const linksList = this.state.links.map(link => (
                <div className="profileLink" key={link.projectLinkId}><a href={link.url}>{link.url}</a><button onClick={this.handleButtonClick.bind(this, link.linkId)}>delete</button></div>
            ))
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
                        {linksList}
                    </div>
                </div>
            );
        } else {
            return <p>data can not be fetched</p>
        }
        
    }
}


class EditProject extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            project:{},
            fetched:false  
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/displayProject/1`)
            .then(res => res.json())
            .then(res => this.setState({ project: res[0], fetched:true }));
    }

    render() {
        if (this.state.fetched) {
            const projId = this.state.project.projectId;
            const projName = this.state.project.name;
            const projDesc = this.state.project.description;
            const projSize = this.state.project.groupsize;
            return (
                <div>
                    <Header version="newProject" />
                    <EditProjectName name={projName}/>
                    <EditDescription description={projDesc} />
                    <EditGroupsize groupsize={projSize} />
                    <EditParticipants id={projId}  />
                    <Problems id={this.state.project.projectId}/>
                    <ProjectLinks id={this.state.project.projectId}/>
                    <Tags id={projId}/>
                    <SaveButton />
                </div>
            );
        }
        return (
            <p>data can not be fetched</p>
        );

    }
}

export default EditProject;