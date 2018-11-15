import React from 'react';
import Header from './Header';
import ProjectDisplay from './projectsDisplay';


class Projects extends React.Component {
    render() {
        const querry = `http://localhost:5000/displayProjects/tag/${this.props.search}`;
        console.log(querry);
        return (
            <ProjectDisplay title={this.props.search} fetch={querry} />
        );
    }
}


class SearchPage extends React.Component {
    render() {
        const hash = this.props.location.hash.substr(1);
        return (
            <div>
                <Header version="home" />
                <div className="projectContainer">
                <Projects search={hash} ></Projects>
                </div>
            </div>
        );
    }
}

export default SearchPage;