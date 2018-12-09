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
            users: {},
            fetched:false,
            exist:false,
            Redirect:false
        }
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        fetch(`http://localhost:5000/users`)
            .then(res => res.json())
            .then(res => this.setState({ users: res, fetched: true }));
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

        const email=this.state.email;
        const password=this.state.password;

        for(let index=0;index<this.state.users.length;index++){
            if(email === this.state.users[index].email && password === this.state.password) {
                this.setState({
                    exist:true
                })
            }
        }
        
        if(this.state.exist) {
            sessionStorage.setItem("userData", "LoggedIn");
            this.setState({
                Redirect:true
            })
        }
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
