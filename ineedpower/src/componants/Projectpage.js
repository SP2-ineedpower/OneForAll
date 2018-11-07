import React from 'react';
import Header from './Header';
import '../css/projectpage.css';

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
    name: "Bobby",
    email: "nicolas.pecher@student.ehb.be",
    experience: 0,
    bio: "Ik hou van React",
    schoolYear: "2",
    subject: "dig-x swe",
    age: "19",
    type: "admin"
}

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

const projectLike = 
    {
        projectLikeId:1
    }
const userEmail = "maxime.de.grauwe@student.ehb.be"

class ProjectData extends React.Component {
    render() {
        const project = this.props.project;
        return (
            <div>
                <div className="rightButton">
                    <div>
                        <p ><span className="buttonEditProj"><a href="mailto:test@test.com?Subject=Exceeded 2 attempts?body=Hey Coach, I was unable to pass the practice test after 2 attempts. Below is my method of contact along with any details I'd like to discuss.%0dThank you.">JOIN</a></span></p>
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
        const comment = this.props.comment;
        const commentsList = comments.map(comment => (
            <div className="commentBox" key={comment.commentId}>
                <h4><i className="fas fa-user"></i> {User.name}</h4>
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
            comment:{},
            fetched:false  
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/displayProject')
            .then(res => res.json())
            .then(res => this.setState({ project: res.data, fetched:true }, () => console.log('project fetched', res)));
    }

    componentDidMount() {
        fetch('http://localhost:5000/projectcomment')
            .then(res => res.json())
            .then(res => this.setState({ comment: res.data, fetched:true }, () => console.log('comment fetched', res)));
    }

    render() {
        console.log(this.state.project)
        if (this.state.fetched) {
            return (
                <div>
                    <Header version="project" />
                    <ProjectData project={this.state.project[0]}/>
                    <ProjectLinks />
                    <Tags />
                    <Comments comment={this.state.comment[0]}/>
                </div>
            );  
        }
        return (
           <p>data can not be fetched</p>
        );
    }
}

export default Projectpage;