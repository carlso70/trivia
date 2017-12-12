import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Login from './Login';
import FlatButton from 'material-ui/FlatButton';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false
        }
    }

    openLogin = () => {
        this.setState({ 
            showLogin: true
        });
    }
    render() {
        return (
            <div>
                <AppBar
                    title="Trivia"
                    iconElementRight={<FlatButton onClick={() => this.openLogin()}>Log In</FlatButton>}
                />
                <Login open={this.state.showLogin}/>
            </div>
        );
    }
}


export default Header;