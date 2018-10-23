import React from 'react';
import Header from './Header';

class Userpage extends React.Component {
    render() {
        return (
            <div>
            <Header version="user"/>
            <h1>This is the User page</h1>
        </div> 
        );
    }
}

export default Userpage;