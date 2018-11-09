import React from 'react';
import Header from './Header';
import ProjectDisplay from './projectsDisplay';


class PopularProjects extends React.Component {
    render() {
        //this querry will change
        return (
            <ProjectDisplay title="Popular projects" fetch="http://localhost:5000/displayProjects" />
        );
    }
}

class CppProjects extends React.Component {
    render() {
        return (
            <ProjectDisplay title="C++" fetch="http://localhost:5000/displayProjects/tag/Cpp" />
        );
    }
}

class JavaProjects extends React.Component {
    render() {
        return (
            <ProjectDisplay title="Java" fetch="http://localhost:5000/displayProjects/tag/Java" />
        );
    }
}

class WebProjects extends React.Component {
    render() {
        return (
            <ProjectDisplay title="Websites" fetch="http://localhost:5000/displayProjects/tag/Website" />
        );
    }
}

class AngularProjects extends React.Component {
    render() {
        return (
            <ProjectDisplay title="Angular" fetch="http://localhost:5000/displayProjects/tag/Angular" />
        );
    }
}

class ReactProjects extends React.Component {
    render() {
        return (
            <ProjectDisplay title="React" fetch="http://localhost:5000/displayProjects/tag/React" />
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