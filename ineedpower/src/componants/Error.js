import React from 'react';
import { Redirect } from "react-router-dom";


class Errorpage extends React.Component {
    render() {
        return (
            <Redirect to="/"></Redirect>
        );
    }
}

export default Errorpage;