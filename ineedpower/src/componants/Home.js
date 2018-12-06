import React from 'react';
import Header from './Header';
import ProjectDisplay from './projectsDisplay';


class PopularProjects extends React.Component {
    render() {
        //this querry will change
        return (
            <ProjectDisplay title="Liked projects" fetch="http://localhost:5000/displayProjects/liked/1" />  //replace 1 by current user
        );
    }
}

class CppProjects extends React.Component {
    render() {
        return (
            <ProjectDisplay title="C++" fetch="http://localhost:5000/displayProjects/tag/cpp" />
        );
    }
}

class JavaProjects extends React.Component {
    render() {
        return (
            <ProjectDisplay title="Java" fetch="http://localhost:5000/displayProjects/tag/java" />
        );
    }
}

class WebProjects extends React.Component {
    render() {
        return (
            <ProjectDisplay title="Websites" fetch="http://localhost:5000/displayProjects/tag/website" />
        );
    }
}

class AngularProjects extends React.Component {
    render() {
        return (
            <ProjectDisplay title="Angular" fetch="http://localhost:5000/displayProjects/tag/angular" />
        );
    }
}

class ReactProjects extends React.Component {
    render() {
        return (
            <ProjectDisplay title="React" fetch="http://localhost:5000/displayProjects/tag/react" />
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