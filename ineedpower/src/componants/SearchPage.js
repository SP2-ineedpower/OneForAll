import React from 'react';
import Header from './Header';
import ProjectDisplay from './projectsDisplay';

class SearchPage extends React.Component {
    render() {
        const hash = this.props.location.hash;
        return (
            <div>
                <Header version="home" />
                <div className="projectContainer">
                    <p>test</p>
                    <p>{hash}</p>
                </div>

            </div>
        );
    }
}

export default SearchPage;