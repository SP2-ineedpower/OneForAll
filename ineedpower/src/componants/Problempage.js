import React from 'react';
import Header from './Header';
import '../css/problem.css';
import Comments from './comments';



class Problem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problem: {},
            fetched: false
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/problem/${this.props.hash}`)
            .then(res => res.json())
            .then(res => this.setState({ problem: res[0], fetched: true }));
    }

    render() {
        if (this.state.fetched) {
            return (
                <div className="problem">
                    <p>{this.state.problem.problem}</p>
                </div>
            );
        }
        else {
            return (
                <div>
                    <p></p>
                </div>
            );
        }
    }
}

class ProblemPage extends React.Component {
    render() {
        return (
            <div >
                <Header version="project" />
                <div className="problemPage">
                <Problem hash= {this.props.location.hash.substr(1)}></Problem>
                <Comments problem={true} className="problemComments" hash={this.props.location.hash.substr(1)}></Comments>
                </div>
                
            </div>
        );
    }
}

export default ProblemPage;