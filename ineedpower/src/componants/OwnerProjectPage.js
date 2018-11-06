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
        solved : true
    }
]


class ProjectData extends React.Component {
    render() {
        return (
            <div>
                <div className="rightButton">
                    <div>
                        <NavLink to="/CreateProject"><p className="back"><span className="buttonEditProj">Edit Project</span></p></NavLink>
                    </div>
                </div>
                <div className="paragraafEditProj">
                <p><b>Project name:</b></p>
                <span>{}</span>

                <div>
                <p><b>Likes:</b></p>
                <span className="fitIn"><LikeOwner projectLikeId={projectLike.projectLikeId}></LikeOwner></span>
                </div>

                <p><b>Owner:</b></p>
                <span>{}</span>

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
            liked : true,
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
                liked:true
            });
            commentLikes.pop();
        }
    }

    render() {
        return(
            <div>
                <i className="far fa-thumbs-up styleLikeComment" onClick={this.handleLikeClick}></i>
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
            problems : problems
        }
        
    }

    isSolved(problem) {
        if (problem.solved) {
            return "problemBox solvedProblem";
        } else {
            return "problemBox";
        }
    }

    render() {
        const ProblemList = problems.map(problem => (

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
    render() {
        return (
            <div>
                <Header version="project" />
                <ProjectData />
                <ProjectLinks />
                <ProblemsOwner />
                <Tags />
                <Comments />
            </div>
        );
    }
}

export default Projectpage;