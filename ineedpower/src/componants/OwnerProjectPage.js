import React from 'react';
import { NavLink } from 'react-router-dom'
import Header from './Header';
import Users from './Users';
import '../css/projectpage.css';
import Comments from './comments'


class ProjectData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            project: this.props.project,
            Owner:{}
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/project/owner/${this.props.project.projectId}`)
            .then(res => res.json())
            .then(res => this.setState({ Owner: res[0], fetched: true }));
    }

    getNav(id){
        return `/CreateProject/#${id}`
    }

    render() {
        const project = this.state.project;
        const ownerId = this.state.Owner.userId;
        project.creationDate = project.creationDate.slice(0,10);
        return (
            <div>
                <div className="rightButton">
                    <div>
                        <NavLink to={this.getNav(project.projectId)}><p className="back"><span className="buttonEditProj">Edit Project</span></p></NavLink>
                    </div>
                </div>
                <div className="paragraafEditProjMax">
                <p><b>Project name:</b> <span>{project.name}</span></p>

                <div>
                    <b>Likes:</b> <span className="fitIn"><LikeOwner id={project.projectId}></LikeOwner></span>
                </div>

                <p><b>Owner:</b> <span>{this.state.Owner.name}</span></p>

                <p><b>Creation Date:</b> <span>{project.creationDate}</span></p>

                <p><b>Description:</b> <span>{project.description}</span></p>

                <p><b>Groupsize:</b> <span>{project.groupsize}</span></p>
                
                <Users fetch={`http://localhost:5000/project/participants/${this.props.project.projectId}`} edit={false} id={this.props.project.projectId} ownerId={ownerId}/>

                </div>

            </div>
        )
    };
}

class LikeOwner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: [],
            liked:false,
            class:"far fa-thumbs-up styleLikeComment"
        }
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        fetch(`http://localhost:5000/projectlikes/${this.props.id}`)
        .then(res => res.json())
        .then(res => this.setState({ likes: res}, function() {
            this.state.likes.map(like => {
                if (like.userId === this.props.user) { 
                    this.setState({
                        liked:true,
                        class: "far fa-thumbs-up styleLikeComment likeClicked"
                    })
                }
            })
        }));
    }

    onClick() {
        if (!this.state.liked) {
            this.state.likes.push({});
            this.setState({
                liked: true,
                class: "far fa-thumbs-up styleLikeComment likeClicked"
            })
            fetch(`http://localhost:5000/projectlike/add/${this.props.id}/${this.props.user}`)
        } else {
            this.state.likes.pop();
            this.setState({
                liked: false,
                class: "far fa-thumbs-up styleLikeComment"
            })
            fetch(`http://localhost:5000/projectlike/delete/${this.props.id}/${this.props.user}`)
        }
    }

    render() {
        return (
            <div>
                <i className={this.state.class} onClick={this.onClick}></i>
                <span>{this.state.likes.length}</span>
            </div>
        );
    }
}

class Tags extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            fetched: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/projecttags/${this.props.id}`)
            .then(res => res.json())
            .then(res => this.setState({ tags: res, fetched: true }));
    }

    render() {
        if(this.state.fetched) {
            const competenceList = this.state.tags.map(tag => (
                <div className="tags" key={tag.tagId}><span>{tag.tag}</span></div>
            ))
            return (
                <div>
                    <div className="profileTitle">
                        <b>Tags</b>
                    </div>
                    <div className="profileContainer">
                        {competenceList}
                    </div>
                </div>
            );
        }
        return(
            <p>Project tags could not be fetched</p>
        );
    }
}

class ProjectLinks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            links:[],
            fetched:false  
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/projectlinks/${this.props.id}`)
            .then(res => res.json())
            .then(res => this.setState({ links: res, fetched:true }));
    }
    render() {
        if(this.state.fetched){
            const linksList = this.state.links.map(link => (
                <div className="profileLink" key={link.projectLinkId}><a href={link.url}>{link.url}</a></div>
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
        return(
            <p>Project Links could not be fetched</p>
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
        if (this.state.fetched) {
            const ProblemList = this.state.problems.map(problem => (
                <div className={this.isSolved(problem)} key={problem.problemId} onChange={this.handleSolved} >
                    <p>{problem.problem}</p>
                </div>
            ))
            return (
                <div>
                    <div>
                        <h2 className="profileTitle">Problems</h2>
                    </div>
                    <div className="profileContainer">
                        {ProblemList}
                    </div>
                </div>
            )
        }
        return (
            <p>Problem could not be fetched</p>
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
        fetch(`http://localhost:5000/displayProject/${this.props.location.hash.substr(1)}`)
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
                    <ProjectLinks id = {projId}/>
                    <ProblemsOwner id = {projId}/>
                    <Tags id = {projId} />
                    <Comments id = {projId} />
                </div>
            );
        }
        return (
            <p>project can not be fetched</p>
        );
    }
}

export default Projectpage;