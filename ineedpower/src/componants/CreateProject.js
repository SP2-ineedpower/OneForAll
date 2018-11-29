import React from 'react';
import Header from './Header';
import Users from './Users';
import '../css/createproject.css';

//Deze pagina wordt gebruikt om bestaande projecten te editen
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
        const tempNum = this.state.problems[this.state.problems.length - 1].problemId + 1; //temporary id of the link
        const problem = {
            problemId: tempNum,
            problem: this.state.value
        }

        fetch(`http://localhost:5000/problems/add/`, {
            method: 'POST',
            body: JSON.stringify({
                "problem": this.state.value,
                "projId": this.props.id,
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        this.state.problems.push(problem);
        this.setState({
            value: ""
        });
    }    

    handleClick(deleteId,event){
        event.preventDefault();
        const tempNum = this.state.problems[this.state.problems.length - 1].problemId + 1; //temporary id of the link
        const problem = {
            problemId: tempNum,
            problem: this.state.value
        }

        fetch(`http://localhost:5000/problems/delete/`, {
            method: 'POST',
            body: JSON.stringify({
                "problemId": deleteId
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        let pos = -1;
        for (let index = 0; index < this.state.problems.length; index++) {
            if (this.state.problems[index].problemId === problem.problemId) {
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
                    <div>
                        <p>{problem.problem} <i className="fas fa-trash-alt participantDeleteIcon" onClick={this.handleClick.bind(this, problem.problemId)}></i></p>
                    </div>
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

class ParticipantsRequest extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            participantrequest: [],
            fetched: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    deleteParticipantFromParticipantRequest(participantrequestId){
        fetch(`http://localhost:5000/participantrequest/delete/`, {
            method: 'POST',
            body: JSON.stringify({
                "participantrequestId": participantrequestId
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

    handleClick(participantrequestId,event){
        event.preventDefault();
        let posi = -1;
        for (let index = 0; index < this.state.participantrequest.length; index++) {
            if (this.state.participantrequest[index].participantrequestId === participantrequestId) {
                posi = index;
            }
        }
        const toBecomeParticipant = this.state.participantrequest[posi]
        fetch(`http://localhost:5000/participants/add/`, {
            method: 'POST',
            body: JSON.stringify({
                "userId": toBecomeParticipant.userId,
                "projectId": this.props.id
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        //functie die participantrequest gaat delete
        this.deleteParticipantFromParticipantRequest(toBecomeParticipant.participantrequestId);

        let pos = -1;
        for (let index = 0; index < this.state.participantrequest.length; index++) {
            if (this.state.participantrequest[index].participantrequestId === participantrequestId) {
                pos = index;
            }
        }
        this.state.participantrequest.splice(pos, 1);
        this.setState({
        });
    }

    componentDidMount() {
        fetch(`http://localhost:5000/participantrequest/${this.props.id}`)
            .then(res => res.json())
            .then(res => this.setState({ participantrequest: res, fetched:true }));
    }

    render(){
        /*console.log(this.state.participantrequest.userId);
        console.log(this.props.id);*/
        const participantrequestList = this.state.participantrequest.map(participantrequest => (
            <div className="participantBox" key={participantrequest.participantrequestId}>
                <form>
                <p className="centerNameParticipant">{participantrequest.email}</p> <i className="fas fa-check-square participantAcceptIcon" onClick={this.handleClick.bind(this, participantrequest.participantrequestId)}></i>
                </form>
            </div>
        ))
        if(this.state.fetched){
            return(
                <div>
                    <p className="profileTitle">Participants Request</p>
                    <div className="profileContainer">
                        {participantrequestList}
                    </div>
                </div>
            );
        } 
        return(
            <p>ParticipantsRequest not found</p>
        );
    }
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
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    componentDidMount() {
        fetch(`http://localhost:5000/projectlinks/${this.props.id}`)
            .then(res => res.json())
            .then(res => this.setState({ links: res, fetched: true }));
    }

    handleClick() {
        this.setState({
            class: 'input',
            place: ''
        })
    }

    handleSubmit(event) {

        event.preventDefault();

        const tempNum =this.state.links[this.state.links.length-1].projectLinkId + 1; //temporary id of the link
        let link = {
            projectLinkId:tempNum,      
            projectId: this.props.id,
            url: this.state.value
        }

        fetch(`http://localhost:5000/projectlinks/add/`, {
        method: 'POST',
        body: JSON.stringify({
            "projectId": this.props.id,   // the "" around the key are important
            "url": this.state.value
        }),
        headers: {
            "Content-Type": "application/json",
        }
    });

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

        console.log("projectId" + this.props.id);
        console.log("projectLinkId" + id);

        fetch(`http://localhost:5000/projectlinks/delete/`, {
        method: 'POST',
        body: JSON.stringify({
            "projectLinkId": id,
            "projectId": this.props.id   // the "" around the key are important
        }),
        headers: {
            "Content-Type": "application/json",
        }
    });

    let pos = -1;
        for (let index = 0; index < this.state.links.length; index++) {
            if (this.state.links[index].projectLinkId === id) {
                pos = index;
            }
        }

        this.state.links.splice(pos, 1);
        this.setState({
        });
    }

    showLinks() {
        if (this.state.fetched) {
            const linksList = this.state.links.map(link => (
                <div className="profileLink" key={link.projectLinkId}><a href={link.url}>{link.url}</a><button onClick={this.handleButtonClick.bind(this, link.projectLinkId)}>delete</button></div>
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
        const tempNum = this.state.comments[this.state.comments.length - 1].commentId + 1; //temporary id of the link
        const comment = {
            commentId: tempNum,
            comment: this.state.value
        }

        fetch(`http://localhost:5000/comments/add/`, {
            method: 'POST',
            body: JSON.stringify({
                "comment": this.state.value,
                "projId": this.props.id,
                "userId":  this.props.owner 
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        this.state.comments.push(comment);
        this.setState({
            value: ""
        });
    }    

    handleClick(deleteId,event){
        event.preventDefault();
        fetch(`http://localhost:5000/comments/delete/${deleteId}`, {
            method: 'POST',
            body: JSON.stringify({
                "commentId": deleteId
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        let pos = -1;
        for (let index = 0; index < this.state.comments.length; index++) {
            if (this.state.comments[index].commentId === deleteId) {
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
        fetch(`http://localhost:5000/displayProject/${this.props.location.hash.substr(1)}`)
            .then(res => res.json())
            .then(res => this.setState({ project: res[0], fetched: true }));
    }

    render() {
        if (this.state.fetched) {
            const projId = this.state.project.projectId;
            const projName = this.state.project.name;
            const projDesc = this.state.project.description;
            const projSize = this.state.project.groupsize;
            const owner = this.state.project.creatorId;
            return (
                <div>
                    <Header version="newProject" />
                    <div className="backgroundprofile">
                        <EditProjectName value={projName} id={this.state.project.projectId}/>
                        <EditDescription value={projDesc} id={this.state.project.projectId} />
                        <EditGroupsize value={projSize} id={this.state.project.projectId} />
                        <ProjectLinks id={this.state.project.projectId}/>
                        <Users fetch={`http://localhost:5000/project/participants/${projId}`} edit={true} id={projId} />
                        <ParticipantsRequest id={projId} />
                        <Problems id={this.state.project.projectId}/>
                        <ProjectComments id={projId} owner={owner}/>
                        <Tags id={projId}/>
                    </div>
                </div>
            );
        }
        return (
            <p>data can not be fetched</p>
        );

    }
}

export default EditProject;