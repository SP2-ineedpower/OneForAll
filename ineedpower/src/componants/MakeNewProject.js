import React from 'react';
import Header from './Header';
import '../css/makenewproject.css';

class NewProjectData extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description:'',
            groupsize:'',
        }
        this.handleClick = this.handleClick.bind(this);
    }
    
    update(e) {
        this.setState({
          name: this.refs.name.value,
          description: this.refs.description.value,
          groupsize:this.refs.groupsize.value
        });
      }

    handleClick(event){
        event.preventDefault();
        const name = this.state.name;
        const description = this.state.description;
        const groupsize = this.state.groupsize;
        console.log(this.props.id);
        fetch(`http://localhost:5000/project/add`, {
            method: 'POST',
            body: JSON.stringify({
                "name":name,
                "description":description,
                "groupsize":groupsize,
                "creatorId":this.props.id
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

    render(){
        return(
            <div className="positionNewProject">
                <form>
                    <p>Name: <input type="text" placeholder="name project" ref="name" onChange={this.update.bind(this)}></input></p>
                    <p>Description: </p>
                    <textarea rows="4" cols="50" placeholder="description project" ref="description" onChange={this.update.bind(this)}></textarea>
                    <p>Groupsize: <input type="text" placeholder="size" ref="groupsize" onChange={this.update.bind(this)}></input></p>
                    <button className="saveNewProject" onClick={this.handleClick}>Submit</button>
                </form> 
            </div>
        );
    }
}

class NewProject extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            user:{}
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/users/${this.props.location.hash.substr(1)}`)
            .then(res => res.json())
            .then(res => this.setState({ user: res[0], fetched: true }));
    }

    render(){
        return(
            <div>
                <Header version="newproject"></Header>
                <NewProjectData id={this.state.user.userId}/>
            </div>
        );
    }
}

export default NewProject;