import React from 'react';
import {NavLink} from 'react-router-dom'
import Header from './Header';
import '../css/createproject.css';

//Deze pagina wordt gebruikt om bestaande projecten te editen en nieuwe projecten aan te maken
const commentLikes = [
    {
        likeId:1,
        commentId:1
    },{
        likeId:2,
        commentId:1
    },{
        likeId:3,
        commentId:1
    },{
        likeId:3,
        commentId:3
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
                    <div className="profileTitle">
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
            value:this.props.value,
            updated: false
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
        const name = this.state.value;
        fetch(`http://localhost:5000/project/name`, {
            method: 'POST',
            body: JSON.stringify({
                "name": name,
                "id": this.props.id
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
    }   

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value });
    }

    render() {
    
        return (
            <div className="centerProjectdata">

                <div className="projectName">
                    <form onSubmit={this.handleSubmit}>
                        <p>
                            <b>Name of project: </b> <input type="text" placeholder="I Need Power" value={this.state.value} onChange={this.handleChange}></input>
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
            value:this.props.value,
            updated: false
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
        const description = this.state.value;
        fetch(`http://localhost:5000/project/description`, {
            method: 'POST',
            body: JSON.stringify({
                "description": description,
                "id": this.props.id
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
    }   

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value });
    }

    render() {
        return (
            <div className="centerProjectdata">

                <div className="projectName">
                    
                    <form onSubmit={this.handleSubmit}>
                        <p>
                            <b>Description: </b> <input type="text" value={this.state.value} onChange={this.handleChange}></input>
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
            value: this.props.value,
            updated: false
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
        const groupsize = this.state.value;
        fetch(`http://localhost:5000/project/groupsize`, {
            method: 'POST',
            body: JSON.stringify({
                "groupsize": groupsize,
                "id": this.props.id
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
    }   

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value });
    }

    
    render() {
        return (
            <div className="centerProjectdata">

                <div className="projectName">
                    
                    <form onSubmit={this.handleSubmit}>
                        <p>
                            <b>Groupsize: </b> <input type="text" value={this.state.value} onChange={this.handleChange}></input>
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
            problems:{},
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
        const problem = {
            problemId:4,
            problem:this.state.value
        }
        this.state.problems.push(problem);
        this.setState({
            value:""
        });
    }    

    handleClick(id,event){
        let pos = -1;
        for (let index = 0; index < this.state.problems.length; index++) {
            if (this.state.problems[index].problemId === id) {
                pos = index;
            }
        }
        this.state.problems.splice(pos, 1);
        this.setState({
        });
    }

    componentDidMount() {
        fetch(`http://localhost:5000/project/projectproblem/${this.props.id}`)
            .then(res => res.json())
            .then(res => this.setState({ problems: res, fetched:true }));
    }

    render() {
        if(this.state.fetched) {
            const ProblemList = this.state.problems.map(problem => (
                <div className="problemBox" key={problem.problemId}>
                    <p>{problem.problem} <i className="fas fa-trash-alt participantDeleteIcon" onClick={this.handleClick.bind(this, problem.problemId)}></i></p>
                </div>
            ))
            return (
                <div>
                    <div>
                    <h2 className="profileTitle">Problems</h2>
                    </div>
                    <div>
                    <form onSubmit={this.handleSubmit} className="profileContainer">
                   
                        <p><i className="fas fa-user approachComment"></i>
                        <input className="addProblemEditProj" type="text" placeholder="Add Problem" value={this.state.value} onChange={this.handleChange}></input>
                        </p>
                            {ProblemList}
                        </form>
                    </div>
                </div>

            )
        } return(
            <p>Project problem could not be fetched</p>
        );
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
        this.state.participants.push(participant);
        this.setState({
            value:""
        });
    }

    handleClick(id,event){
        let pos = -1;
        for (let index = 0; index < this.state.participants.length; index++) {
            if (this.state.participants[index].participantId === id) {
                pos = index;
            }
        }
        this.state.participants.splice(pos, 1);
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
                    <form onSubmit={this.handleSubmit} className="profileContainer">
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

class Like extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            liked : false,
            commentId: this.props.commentId
        }
        this.handleLikeClick = this.handleLikeClick.bind(this);
    }

    handleLikeClick(e){
        if (!this.state.liked) {
            e.target.className="far fa-thumbs-up styleLikeComment likeClicked";
            const like = {
                commentId:this.state.commentId
            }
            commentLikes.push(like);
            this.setState({
                liked:true
            });
        } else {
            e.target.className="far fa-thumbs-up styleLikeComment";
            this.setState({
                liked:false
            });
            commentLikes.pop();
        }
    }

    likes() {
        let teller = 0;
        for (let index = 0; index < commentLikes.length; index++) {
            if(this.state.commentId === commentLikes[index].commentId)
            {
                teller ++;
            }
        }
        return teller;
    }

    render() {
        return(
            <div>
                <i className="far fa-thumbs-up styleLikeComment" onClick={this.handleLikeClick}></i>
                {this.likes()}
            </div>
        )
    }
}

class ProjectComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:"",
            comments: [],
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
        const comment = {
            commentId:4,
            comment:this.state.value
        }
        this.state.comments.push(comment);
        this.setState({
            value:""
        });
    }    

    handleClick(id,event){
        let pos = -1;
        for (let index = 0; index < this.state.comments.length; index++) {
            if (this.state.comments[index].commentId === id) {
                pos = index;
            }
        }
        this.state.comments.splice(pos, 1);
        this.setState({
        });
    }

    componentDidMount() {
        fetch(`http://localhost:5000/comments/${this.props.id}`)
            .then(res => res.json())
            .then(res => this.setState({ comments: res, fetched: true }));
    }

    render() {
        if(this.state.fetched) {
            const commentsList = this.state.comments.map(comment => (
                <div className="commentBox" key={comment.commentId}>
                    <h4><i className="fas fa-user"></i> {}</h4>
                    <p>{comment.comment} <i className="fas fa-trash-alt participantDeleteIcon" onClick={this.handleClick.bind(this, comment.commentId)}></i></p>
                    <Like commentId={comment.commentId}></Like>
                </div>
            ))
            return (
                
                <form onSubmit={this.handleSubmit} className="profileContainer">
                    <h2 className="titleComments">Comments</h2>
                    <p><i className="fas fa-user approachComment"></i>
                    <input className="addCommentEditProj" type="text" placeholder="Add comment" value={this.state.value} onChange={this.handleChange}></input>
                    </p>
                    {commentsList}
                </form>
            )
        }
        return(
            <p>Project comments could not be fetched</p>
        )
    };
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
                    <EditProjectName value={projName} id={this.state.project.projectId}/>
                    <EditDescription value={projDesc} id={this.state.project.projectId} />
                    <EditGroupsize value={projSize} id={this.state.project.projectId} />
                    <ProjectLinks id={this.state.project.projectId}/>
                    <EditParticipants id={projId}  />
                    <Problems id={this.state.project.projectId}/>
                    <ProjectComments id = {projId}/>
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