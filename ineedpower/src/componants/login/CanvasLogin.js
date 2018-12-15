import React from "react";
import { APIData } from "../APIData";
import { Redirect } from "react-router-dom";


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "", //empty because post data gets bound
      password: "",
      redirect: false
    };
    this.login = this.login.bind(this); //use this anywhere (login)
    this.onChange = this.onChange.bind(this);
  }

  login() {
    if (this.state.username && this.state.password) {
      APIData("login", this.state).then(result => {
        let responseJSON = result;
        if (responseJSON.userData) {
          sessionStorage.setItem("userData", responseJSON);
          this.setState({ redirect: true });
        } else {
          console.log("login error");
        }
      });
    }
  }

  onChange(element) {
    this.setState({ [element.target.name]: element.target.value }); //while typing, to change the values of username and password.
  }

  render() {
    //login data has been requested and validated
    if (this.state.redirect) {
      return <Redirect to={"/"} />;
    }

    //if userdata was already filled in for session, redirect to homepage
    if (sessionStorage.getItem("userData")) {
      return <Redirect to={"/"} />;
    }

    return (
      <div className="Login">
        <h2>Login page</h2>
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Ehb student account"
          onChange={this.onChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={this.onChange}
        />

        <input
          type="submit"
          value="login"
          className="button"
          onClick={this.login}
        />
      </div>
    );
  }
}

export default Login;

