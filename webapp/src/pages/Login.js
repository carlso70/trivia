import React, { Component } from 'react';
import { render } from 'react-dom';
import TextField from 'material-ui/Button';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div>
                <TextField hintText="Username"/>
                <br/>
                <TextField hintText="Password"/>
                </div>
        );
    }
}

export default Login;
