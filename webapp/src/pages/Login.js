import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        }
    }

    // Log in the user, and save token to localstorage
    logIn() {
    }

    close = () => {
        this.setState({
            open: false,
        })
    }

    render() {
        const actions = [
            <FlatButton
                label="Log In"
                onClick={this.logIn}
            />,
            <FlatButton
                label="Close"
                onClick={this.close}
            />,
        ];
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    actions={actions}
                    modal={true}
                >
                    <TextField hintText="Username" />
                    <br />
                    <TextField hintText="Password" />
                </Dialog>
            </div>
        );
    }
}

export default Login;
