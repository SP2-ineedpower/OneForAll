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
            .then(res => this.setState({ projects: res.data, fetched: true }));
    }
    render() {
        if (this.state.fetched) {
            return (
                <div>
                    <p className="profileTitle"><b>{this.props.title}</b></p>
                    <div className="profileContainer">
                        <Projects projs={this.state.projects} />
                    </div>
                </div>
            );
        } else {
            return <p>projects can't be fetched</p>
        }
        
    }
}

export default ProjectDisplay;