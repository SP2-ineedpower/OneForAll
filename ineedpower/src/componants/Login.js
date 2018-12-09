import React from "react";
import { Redirect } from "react-router-dom";
import NewAccount from "./NewAccount";
import GoogleLogin from "./GoogleLogin";


class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            Redirect:false
        }
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(e) {
        e.preventDefault();
        //checking if the data is vallid
        //if the data is valid create a session 
        sessionStorage.setItem("userData", "LoggedIn");
        this.setState({
            Redirect:true
        })
    }

    render() {
        if (this.state.Redirect) {
            return <Redirect to= "/"></Redirect>;
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password"/>
                    <button type="submit">Log in</button>
                </form>
            </div>
        );
    }
}


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            version: "default"  //shows the 3 different login options (signUp,NewAccount button and google button) , google is not a priority
        }
        this.handleNewAccount = this.handleNewAccount.bind(this);
    }

    handleNewAccount() {
        this.setState({
            version: "newAccount"
        });
    }

    handleGoogle() {
        this.setState({
            version: "google"
        });
    }

    render() {
        if (this.state.version === "default") {
            return (
                <div>
                    <Signup></Signup>
                    <button onClick={this.handleNewAccount}>Create Account</button>
                    {/*<button onClick={(this.handleGoogle)}></button>   this is not a priority */}
                </div>
            );
        }
        if (this.state.version === "newAccount") {
            return (
                <NewAccount></NewAccount>
            );
        }
        if (this.state.version === "google") {
            return (
                <GoogleLogin></GoogleLogin>
            );
        } else {
            return <h1>an error occured</h1>;
        }
    }
}

export default Login;
