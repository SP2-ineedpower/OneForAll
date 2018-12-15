import React from "react";
import { Redirect } from "react-router-dom";
import NewAccount from "./NewAccount";
import GoogleLogin from "./GoogleLogin";
import logo from '../pictures/ineedpowerlogo_v002.gif';
import '../css/login.css';

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            user: {},
            found: false,
            Redirect: false,
            wrongEmail: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    findUser(email) {
        fetch(`http://localhost:5000/login/user/${email}`)
            .then(res => res.json())
            .then(res => this.setState({ user: res[0], found: true }))
            .catch(error => this.setState({ wrongEmail: true }));

    }

    authenticate() {
        //console.log("test");
        fetch(`http://localhost:5000/authenticate/`, {
            method: 'POST',
            body: JSON.stringify({
                "password": this.state.password,   // the "" around the key are important
                "userPassword": this.state.user.password,
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(res => this.setState({ Redirect: res.result }, console.log(res)));
        /*fetch(`http://localhost:5000/authenticate/${this.state.password}/${this.state.user.password}`)
            .then(res => res.json())
            .then(res => this.setState({ Redirect: res.result }, console.log(res)));*/
    }

    update(e) {
        this.setState({
            email: this.refs.email.value,
            password: this.refs.password.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.findUser(this.state.email);
    }

    setJWT() {
        let token
        console.log("name: " + this.state.user.name)
        return fetch(`http://localhost:5000/authenticate/token`, {
            method: 'POST',
            body: JSON.stringify({
                "username": this.state.user.name,   // the "" around the key are important
                "email": this.state.user.email,
                "userId": this.state.user.userId,
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(data => token = data)
            .then(() => localStorage.setItem("userToken", JSON.stringify(token)));
    }

    render() {
        if (this.state.found && !this.state.Redirect) {
            console.log("found");
            this.authenticate();
        }


        if (this.state.Redirect) {
            console.log("login");
            this.setJWT();
            return <Redirect to="/"></Redirect>;
        }


        return (
            <div className="signup">
                <form onSubmit={this.handleSubmit}>
                    <input type="email" placeholder="email" ref="email" required onChange={this.update.bind(this)} />
                    <input type="password" placeholder="password" ref="password" required onChange={this.update.bind(this)} />
                    <button type="submit" className="loginButton">Log in</button>
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
        this.changeVersion = this.changeVersion.bind(this);
    }

    handleNewAccount() {
        this.setState({
            version: "newAccount"
        });
    }

    changeVersion() {
        this.setState({
            version: "default"
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
                <div className="loginMain">
                    <div className="loginContainer">
                        <img src={logo} className="loginLogo" alt=""></img>
                        <Signup></Signup>
                        <button onClick={this.handleNewAccount} className="newAccountButton">Create account</button>
                        {/*<button onClick={(this.handleGoogle)}></button>   this is not a priority */}
                    </div>
                </div>
            );
        }
        if (this.state.version === "newAccount") {
            return (
                <div className="loginMain">
                    <div className="loginContainer">
                        <img src={logo} className="loginLogo" alt=""></img>
                        <NewAccount changeVersion={this.changeVersion}></NewAccount>
                    </div>
                </div>
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
