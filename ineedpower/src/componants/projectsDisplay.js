import React from 'react';
import Projects from './Projects'


class ProjectDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            fetched: false
        }
    }

    componentDidMount() {
        fetch(this.props.fetch)  // must change later
            .then(res => res.json())
            .then(res => this.setState({ projects: res, fetched: true }));
        console.log(this.props.projects)
    }
    
    render() {
        if (this.state.fetched) {
            console.log(this.state.projects);
            return (
                <div>
                    <p className="profileTitle"><b>{this.props.title}</b></p>
                    <div className="profileContainer">
                        <Projects projs={this.state.projects} />
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                <p className="profileTitle"><b>{this.props.title}</b></p>
                <div className="profileContainer">
                </div>
            </div>
            );
        }
        
    }
}

export default ProjectDisplay;