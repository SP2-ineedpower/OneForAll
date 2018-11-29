import React from 'react';
import Projects from './Projects'


class ProjectDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            fetched: false,
            update:''
        }
    }

    fetchData(dataFetch) {
        fetch(dataFetch)  // must change later
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