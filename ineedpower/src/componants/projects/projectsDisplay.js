import React from 'react';
import Projects from './Projects'


class ProjectDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            fetched: false,
            update:'',
            class: 'profileContainer'
        }
        this.hide = this.hide.bind(this);
    }

    fetchData(dataFetch) {
        fetch(dataFetch)
            .then(res => res.json())
            .then(res => this.setState({ projects: res, fetched: true }));
    }

    componentDidMount() {
        this.fetchData(this.props.fetch);
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps.fetch);
        this.fetchData(nextProps.fetch);
    }

    hide(){
        if(this.state.class === 'hide profileContainer'){
            this.setState({class:"profileContainer"});
        } else{
            this.setState({class: 'hide profileContainer'});
        }
    }
    
    render() {
        if (this.state.fetched) {
            return (
                <div className="projectRowWrapper">
                    <p className="profileTitle" onClick={this.hide}><b>{this.props.title}</b></p>
                    <div className={this.state.class}>
                        <Projects projs={this.state.projects} user={this.props.user}/>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="projectRowWrapper">
                <p className="profileTitle"><b>{this.props.title}</b></p>
                <div className="profileContainer">
                </div>
            </div>
            );
        }
        
    }
}

export default ProjectDisplay;