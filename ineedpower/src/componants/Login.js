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
            user: {},
            fetched:false,
            exist:{},
            existing:false,
            Redirect:false
        }
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    findUser(email) {
        console.log("DE EMAIL IN DE FUNCTIE " + email);
        fetch(`http://localhost:5000/login/user/${email}`)
            .then(res => res.json())
            .then(res => this.setState({ user: res, fetched: true }));
    }

    authenticate(){
        fetch(`http://localhost:5000/authenticate/${this.state.password}/${this.state.user.password}`)
            .then(res => res.json())
            .then(res => this.setState({ exist: res, existing: true }));
    }

    update(e) {
        this.setState({
            email: this.refs.email.value,
            password: this.refs.password.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        //checking if the data is vallid
        //if the data is valid create a session 
        //this.props.changeVersion();

        const email = this.state.email

        this.findUser(email);

        console.log(this.state.user);
        
        if(this.state.fetched){
            console.log("---------------------FOUND-------------------------");
            this.authenticate();
        }
        else{
            console.log("USER NIET GEVONDEN");
        }
        
        /*if(this.state.exist) {
            sessionStorage.setItem("userData", "LoggedIn");
            this.setState({
                Redirect:true
            })
        }*/
    }

    render() {
        if (this.state.Redirect) {
            return <Redirect to= "/"></Redirect>;
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" placeholder="email" ref="email" onChange={this.update.bind(this)} />
                    <input type="password" placeholder="password" ref="password" onChange={this.update.bind(this)}/>
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
        this.changeVersion = this.changeVersion.bind(this);
    }

    handleNewAccount() {
        this.setState({
            version: "newAccount"
        });
    }

    changeVersion() {
        this.setState({
            version:"default"
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
                <NewAccount changeVersion={this.changeVersion}></NewAccount>
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
