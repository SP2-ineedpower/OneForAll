import React from 'react';
import { NavLink } from 'react-router-dom'
import Header from './Header';
import '../css/projectpage.css';

const projectLike = 
    {
        projectLikeId:1
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

// <ProblemsOwner id = {projId}/>

const links = [
    {
        linkId: 1,
        link: "https://nicolas-pecher.github.io/SidhartaProject/"
    }, {
        linkId: 2,
        link: "https://cas.ehb.be/login"
    }
]

const comments = [
    {
        commentId: 1,
        comment: "react is awesome"
    },
    {
        commentId: 2,
        comment: "react componenten zijn gemakkelijk te maken"
    },
    {
        commentId: 3,
        comment: "react is fantastisch"
    }
]


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

class ProjectData extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            project: this.props.project
        }
    }
    
    render() {
        console.log(this.state);
        return (
            <div>
                <div className="rightButton">
                    <div>
                        <NavLink to="/CreateProject"><p className="back"><span className="buttonEditProj">Edit Project</span></p></NavLink>
                    </div>
                </div>
                <div className="paragraafEditProj">
                <p><b>Project name:</b></p>
                <span>{this.state.name}</span>

                <div>
                <p><b>Likes:</b></p>
                <span className="fitIn"><LikeOwner projectLikeId={projectLike.projectLikeId}></LikeOwner></span>
                </div>

                <p><b>Owner:</b></p>
                <span>{this.state.creatorId}</span>

                <p><b>Creation Date:</b></p>
                <span></span>

                <p><b>Description:</b></p>
                <span>{}</span>

                <p><b>Groupsize:</b></p>
                <span></span>

                </div>

            </div>
        )
    };
}

class LikeOwner extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            email : ""
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

class Tags extends React.Component {

    render() {
        const competenceList = tags.map(tag => (
            <div className="tags" key={tag.tagId}><span>{tag.competence}</span></div>
        ))
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
    render() {
        const linksList = links.map(link => (
            <div className="profileLink" key={link.linkId}><a href={link.link}>{link.link}</a></div>
        ))
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

class ProblemsOwner extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            problems : [],
            fetched: false 
        }
        
    }

    isSolved(problem) {
        if (problem.solved) {
            return "problemBox solvedProblem";
        } else {
            return "problemBox";
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/project/projectproblem/${this.props.id}`)
            .then(res => res.json())
            .then(res => this.setState({ problems: res, fetched: true }));
    }

    render() {
        console.log(this.state.problems);
        if (this.state.fetched) {
            const ProblemList = this.state.problems.map(problem => (
                <div className={this.isSolved(problem)} key={problem.problemId} onChange={this.handleSolved} >
                    <p>{problem.problem}</p>
                </div>
            ))
            return (
                <div>
                    <h2 className="titleComments">Problems</h2>
                    {ProblemList}
                </div>
            )
        }
    };

}

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:"",
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
        const comment = {
            commentId:4,
            comment:this.state.value
        }
        comments.push(comment);
        this.setState({
            value:""
        });
    }    

    render() {
        const commentsList = comments.map(comment => (
            <div className="commentBox" key={comment.commentId}>
                <h4><i className="fas fa-user"></i> {}</h4>
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
            </form>
        )
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
        fetch(`http://localhost:5000/displayProject/1`)
            .then(res => res.json())
            .then(res => this.setState({ project: res[0], fetched:true }));
    }
    render() {
        if(this.state.fetched){
            const projId = this.state.project.projectId;
            const project = this.state.project;
            console.log(this.state.project);
            return (
                <div>
                    <Header version="project" />
                    <ProjectData project = {project} /> 
                    <ProjectLinks />
                    <ProblemsOwner id = {projId}/>
                    <Tags />
                    <Comments />
                </div>
            );
        }
        return (
            <p>project can not be fetched</p>
        );
    }
}

export default Projectpage;