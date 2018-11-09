import React from 'react';
import Header from './Header';
import ProjectDisplay from './projectsDisplay';


class PopularProjects extends React.Component {
    render() {
        return (
            <ProjectDisplay title="Popular projects" fetch="http://localhost:5000/userprojects/" />
        );
    }
}

class CppProjects extends React.Component {
    render() {
        return (
            <ProjectDisplay title="C++" fetch="http://localhost:5000/userprojects/" />
        );
    }
}

class JavaProjects extends React.Component {
    render() {
        return (
            <ProjectDisplay title="Java" fetch="http://localhost:5000/userprojects/" />
        );
    }
}

class WebProjects extends React.Component {
    render() {
        return (
            <ProjectDisplay title="Websites" fetch="http://localhost:5000/userprojects/" />
        );
    }
}

class AngularProjects extends React.Component {
    render() {
        return (
            <ProjectDisplay title="Angular" fetch="http://localhost:5000/userprojects/" />
        );
    }
}

class ReactProjects extends React.Component {
    render() {
        return (
            <ProjectDisplay title="React" fetch="http://localhost:5000/userprojects/" />
        );
    }
}


class Home extends React.Component {
    render() {
        return (
            <div>
                <Header version="home" />
                <div className="projectContainer">
                    <PopularProjects />
                    <CppProjects />
                    <JavaProjects />
                    <WebProjects />
                    <AngularProjects />
                    <ReactProjects />
                </div>

            </div>
        );
    }
}

export default Home;