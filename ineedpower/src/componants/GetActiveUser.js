//import React from "react";


function GetActiveUser () {
    let jwt = localStorage.getItem("userToken");
    let jwtData = jwt.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    return decodedJwtData;
}


/*class GetActiveUser extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    
    console.log(decodedJwtData);
    /*console.log("test");
        fetch(`http://localhost:5000/authenticate/getUser`, {
        method: 'POST',
        body: JSON.stringify({
            "token":token.token
        }),
        headers: {
            "Content-Type": "application/json",
        }
        })
        .then(res => res.json())
        .then(data => console.log(data));
    }

    render() {
        return <p></p>
    }
}*/

export default GetActiveUser;
