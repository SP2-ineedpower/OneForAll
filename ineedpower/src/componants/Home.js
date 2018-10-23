import React from 'react';
import Header from './Header';
class Home extends React.Component {
    render() {
        return (
            <div>
                <Header version="home" />
                <h1>This is the Home page</h1>
            </div>
        );
    }
}

export default Home;