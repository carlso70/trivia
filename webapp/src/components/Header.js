import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Login from './Login';
import FlatButton from 'material-ui/FlatButton';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false,
            user: this.props.user
        };
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.user != this.state.user) {
            this.setState({
                user: nextProps.user
            });
        }
    }

    openLogin = () => {
        this.setState({
            showLogin: true
        });
    }

    logOut = () => {
        localStorage.removeItem("triviaUser");
        window.location.reload();
    }

    render() {
        var logIn = <FlatButton onClick={() => this.openLogin()}>Log In</FlatButton>;
        var logOut = <FlatButton onClick={() => this.logOut()}>Log Out</FlatButton>;
        return (
            <div>
                <AppBar
                    title="Trivia"
            iconElementRight={this.state.user ? logOut : logIn }
                />
                <Login open={this.state.showLogin}/>
            </div>
        );
    }
}


export default Header;
