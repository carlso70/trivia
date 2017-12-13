import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { loginUrl, createUserUrl } from '../utils/urls';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            createAccount: false
        };

        this.createAccount = this.createAccount.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.open != this.state.open) {
            this.setState({
                open: nextProps.open
            });
        }
    }

    // Create an account, and save the token to localstorage
    createAccount() {
        // Switch to create account mode to display create account dialog info
        if (!this.state.createAccount) {
            this.setState({
                createAccount: true
            });
            return;
        }

        // Create account
        fetch(createUserUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.pass,
                question: this.state.question,
                answer: this.state.answer
            }),
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            }
            return null;
        }).then((data) => {
            if (data)
                console.log(data);
        });
    }

    // Log in the user, and save token to localstorage
    logIn() {
        // Switch to log in mode to dispaly correct dialog
        if (this.state.createAccount) {
            this.setState({
                createAccount: false
            });
            return;
        }

        // Log in
        fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.pass
            }),
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            }
            return null;
        }).then((data) => {
            if (data)
                console.log(data);
        });
    }

    close = () => {
        this.setState({
            open: false,
        });
    }

    handleUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        });
    };

    handlePasswordChange = (e) => {
        this.setState({
            pass: e.target.value
        });
    };

    handleQuestionChange = (e) => {
        this.setState({
            question: e.target.value
        });
    };

    handleAnswerChange = (e) => {
        this.setState({
            answer: e.target.value
        });
    };

    render() {
        const actions = [
            <FlatButton
                label="Log In"
                onClick={this.logIn}
            />,
            <FlatButton
                label="Create Account"
                onClick={this.createAccount}
            />,
            <FlatButton
                label="Close"
                onClick={this.close}
            />,
        ];

        if (this.state.createAccount) {
            return (
                <div>
                    <Dialog
                        open={this.state.open}
                        actions={actions}
                        modal={true}
                    >
                        <TextField
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                            hintText="Username" />
                        <br />
                        <TextField
                            value={this.state.pass}
                            onChange={this.handlePasswordChange}
                            type="password"
                            hintText="Password" />
                        <br />
                        <TextField
                            value={this.state.question}
                            onChange={this.handleQuestionChange}
                            hintText="Security Question" />
                        <br />
                        <TextField
                            value={this.state.answer}
                            onChange={this.handleAnswerChange}
                            hintText="Question Answer" />
                    </Dialog>
                </div>
            );
        } else {
            return (
                <div>
                    <Dialog
                        open={this.state.open}
                        actions={actions}
                        modal={true}
                    >
                        <TextField
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                            hintText="Username" />
                        <br />
                        <TextField
                            value={this.state.pass}
                            onChange={this.handlePasswordChange}
                            type="password"
                            hintText="Password" />
                    </Dialog>
                </div>
            );
        }
    }

}

export default Login;
