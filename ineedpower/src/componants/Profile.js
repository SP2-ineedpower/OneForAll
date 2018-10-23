import React from 'react';
import Header from './Header';
class profile extends React.Component {
    render() {
        return (
            <div>
                <Header version="user" />
                <h1>This is the active user page</h1>
            </div>
        );
    }
}

export default profile;