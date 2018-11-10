import React from 'react';
import Header from './Header';
import '../css/projectpage.css';

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

const projectLike = 
    {
        projectLikeId:1
    }

class ProjectData extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            email: ""
        }
    }

    handleEmailClick(){
        var address = "maxime.degrauwe@student.ehb.be";
        var body = "Could I join your project?" //naam van project erbij zou fijn zijn
        var subject = "Joining Project" //met de project name erbij
        var href = "mailto:" + address + "?"
         + "subject=" + subject + "&"
         + "body=" + body;
        return href;
       
    }
    render() {
        const project = this.props.project;
        project.creationDate = project.creationDate.slice(0,10);
        return (
            <div>
                <div className="rightButton">
                    <div>
                        <p ><span className="buttonEditProj"><a value={this.state.testUser} href={this.handleEmailClick()}>JOIN</a></span></p>
                    </div>
                </div>
                <div className="paragraafEditProj">
                <p><b>Project name:</b></p>
                <span>{project.name}</span>
                
                <div>
                <p><b>Likes:</b></p>
                <span className="fitIn"><Like projectLikeId={projectLike.projectLikeId}></Like></span>
                </div>

                <p><b>Owner:</b></p>
                <span>{}</span>

                <p><b>Creation Date:</b></p>
                <span>{project.creationDate}</span>

                <p><b>Description:</b></p>
                <span>{project.description}</span>

                <p><b>Groupsize:</b></p>
                <span>{project.groupsize}</span>
                </div>


            </div>
        )
    };
}

class Tags extends React.Component {
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
            .then(res => this.setState({ tags: res, fetched:true }));
    }

    render() {
        let competenceList = "";
        if (this.state.fetched) {
            console.log(this.state.tags);
            competenceList = this.state.tags.map(tag => (
                <div className="tags" key={tag.tagId}><span>{tag.tag}</span></div>
            ))
        }
        
        return (
            <div>
                <div className="profileTitle">
                    <b>Competences</b>
                </div>
                <div className="profileContainer">
                    {competenceList}
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

class ProjectLinks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            links: {},
            fetched: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/projectlinks/${this.props.id}`)
            .then(res => res.json())
            .then(res => this.setState({ links: res, fetched:true }));
    }

    render() {
        let linksList = "";
        if (this.state.fetched) {
            linksList = this.state.links.map(link => (
                <div className="profileLink" key={link.projectLinkId}><a href={link.url}>{link.url}</a></div>
            ))
        }
        return (
            <div>
                <div className="profileTitle">
                    <b>Links</b>
                </div>
                <div className="profileContainer">
                    {linksList}
                </div>
            </div>
        );
    }
}

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:"",
            comments:{},
            fetched:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    componentDidMount() {
        console.log(this.props.id)
        fetch(`http://localhost:5000/comments/${this.props.id}`)
            .then(res => res.json())
            .then(res => this.setState({ comments: res, fetched:true }));
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
    
    render() {
        if (this.state.fetched) {
            console.log(this.state.comments)
            const commentsList = this.state.comments.map(comment => (
                <div className="commentBox" key={comment.commentId}>
                    <h4><i className="fas fa-user"></i> {comment.name}</h4>
                    <p>{comment.comment}</p>
                    <Like commentId={comment.commentId}></Like>
                </div>
            ))
            return (
                <form onSubmit={this.handleSubmit}>
                    <h2 className="titleComments">Comments</h2>
                    <p><i className="fas fa-user approachComment"></i>
                    <input className="addCommentEditProj" type="text" placeholder="Add comment" value={this.state.value} onChange={this.handleChange}></input>
                    </p>
                    {commentsList}
                </form>);
        }else {
            return(
                <form onSubmit={this.handleSubmit}>
                    <h2 className="titleComments">Comments</h2>
                    <p><i className="fas fa-user approachComment"></i>
                    <input className="addCommentEditProj" type="text" placeholder="Add comment" value={this.state.value} onChange={this.handleChange}></input>
                    </p>
                </form>
            );
        }
        
    };
}

class Projectpage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            project:{},
            fetched:false  
        }
    }

    componentDidMount() {
        console.log()
        fetch(`http://localhost:5000/displayProject/${this.props.location.hash.substr(1)}`)
            .then(res => res.json())
            .then(res => this.setState({ project: res[0], fetched:true }));
    }

    

    render() {
        if (this.state.fetched) {
            const id = this.state.project.projectId;
            console.log(this.state.project);
            return (
                <div>
                    <Header version="project" />
                    <ProjectData project={this.state.project}/>
                    <ProjectLinks id={id} />
                    <Tags id={id} />
                    <Comments id={id}/>
                </div>
            );  
        }
        return (
           <p>data can not be fetched</p>
        );
    }
}

export default Projectpage;