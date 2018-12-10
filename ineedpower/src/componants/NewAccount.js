import React from "react";


class AccountInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.update(this.props.placeholder, this.state.value);
    }

    update(e) {
        this.setState({
            value: e.target.value
        })
    }

    render() {
        return <input type={this.props.type} placeholder={this.props.placeholder} onChange={this.update} onBlur={this.handleSubmit}></input>
    }
}

class NewAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Firstname: "",
            Lastname: "",
            Email: "",
            CheckEmail: "",
            Password: "",
            CheckPassword: "",
            valid: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
    }



    update(toUpdate, value) {
        switch (toUpdate) {
            case "Firstname":
                this.setState({
                    Firstname: value
                })
                break;
            case "Lastname":
                this.setState({
                    Lastname: value
                })
                break;
            case "password":
                this.setState({
                    Password: value
                })
                break;
            case "CheckPassword":
                this.setState({
                    CheckPassword: value
                })
                break;
            case "email":
                this.setState({
                    Email: value
                })
                break;
            case "CheckEmail":
                this.setState({
                    CheckEmail: value
                })
                break;
            default:
                break;
        }
        /* console.log(this.state.Firstname);
         console.log(this.state.Lastname);
         console.log(this.state.Email);
         console.log(this.state.CheckEmail);
         console.log(this.state.Password);
         console.log(this.state.CheckPassword);*/
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.Email === this.state.CheckEmail && this.state.Password === this.state.CheckPassword) {
            this.setState({
                valid: true
            });

            this.sendToDatabase();
        }
        else {
            window.alert("Gelieve dezelfde email te gebruiken en dezelfde wachtwoord.");
        }
    }

    sendToDatabase() {
        
        const name = this.state.Firstname + " " + this.state.Lastname;
        const email = this.state.Email;
        let password = this.state.Password;
        const experience = 0;
        const bio = "New User";
        const subject = "Unknown";
        const type = "user";

        fetch(`http://localhost:5000/user/create`, {
            method: 'POST',
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password,
                "experience": experience,
                "bio": bio,
                "subject": subject,
                "type": type
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        this.props.changeVersion();

    }

    render() {
        return (
            <div>
                <h2>Make new profile</h2>
                <form onSubmit={this.handleSubmit}>
                    <AccountInput type={"text"} placeholder={"Firstname"} update={this.update} />
                    <AccountInput type={"text"} placeholder={"Lastname"} update={this.update} />
                    <AccountInput type={"email"} placeholder={"email"} update={this.update} />
                    <AccountInput type={"email"} placeholder={"CheckEmail"} update={this.update} />
                    <AccountInput type={"password"} placeholder={"password"} update={this.update} />
                    <AccountInput type={"password"} placeholder={"CheckPassword"} update={this.update} />
                    <button>Create account</button>
                </form>
            </div>
        );
    }

}

export default NewAccount;