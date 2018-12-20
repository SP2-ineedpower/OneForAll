import React from 'react';
import {NavLink} from 'react-router-dom';

class ProjectProblems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problems: {},
            fetched: false
        };
    }

    componentDidMount() {
        fetch(`http://localhost:5000/project/projectproblem/${this.props.id}`)
            .then(res => res.json())
            .then(res => this.setState({ problems: res, fetched: true }));
    }

    render() {
        if (this.state.fetched) {

            const ProblemList = this.state.problems.map(problem => (
                <NavLink key={problem.problemId} to={`/problem/#${problem.problemId}`}>
                    <div className="problemBox">
                        <p>{problem.problem}</p>
                    </div>
                </NavLink>

            ))
            return (

                <div className="projectRowWrapper">
                    <p className="profileTitle">Problems</p>
                    <div className="profileContainer">
                        {ProblemList}
                    </div>

                </div>
            )

        }
        return (
            <p></p>
        );
    };

}

export default ProjectProblems;