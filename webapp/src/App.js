import React, { Component } from 'react';
import logo from './logo.svg';
import Header from './components/Header';
import './App.css';
import Game from './pages/Game';
import Home from './pages/Home';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createGameUrl, joinGameUrl, gameSocketUrl } from './utils/urls';
import socketIOClient from 'socket.io-client';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inGame: false,
            game: {},
            user: this.getCurrentUser()
        };
    }

    getCurrentUser = () => {
        var user = JSON.parse(localStorage.getItem("triviaUser"));
        console.log(user);
        return user;
    }

    connectToGameSocket = () => {
        if (!this.state.game.id)
            return; // TODO display not in game error msg
        if (this.socket) {
            // reconnect the websocket
        }
        const endpoint = gameSocketUrl + this.state.game.id;
        this.socket = new WebSocket(endpoint);
        this.socket.onmessage = evt => {
            console.log(evt);
            this.setState({ game: evt.data });
        };
    }

    broadcastGameMessage = (message) => {
        if(!this.socket) {
            console.log("Socket not initialized");
            return;
        }
        this.socket.send(message);
    }

    // createGame attempts to create a game, and then join the game
    createGame = (count, dif) => {
        console.log(this.state.user)
        if (!this.state.user) {
            alert("Please Sign In");
            return;
        }

        console.log(this.state.user.id);

        fetch(createGameUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                difficulty: dif,
                questionCt: count,
                userId: this.state.user.id
            })
        }).then((response) => {
            if(response.status == 200)
                return response.json();
            return null;
        }).then((data) => {
            if (data) {
                console.log(data);
                this.setState({
                    game: data,
                    inGame: true
                }, () => {
                    this.connectToGameSocket();
                });
            }
        });
    }

    // joinGame attempts to create a game, then swtich the state to inGame and display a game page
    joinGame = (game) => {
        console.log(game.gameId);
        if (!this.state.user) {
            alert("Please Sign In");
            return;
        }

        console.log(this.state.user.id);

        fetch(joinGameUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: this.state.user.id,
                gameId: game.gameId
            })
        }).then((response) => {
            if(response.status == 200)
                return response.json();
            return null;
        }).then((data) => {
            if (data) {
                console.log(data);
                this.setState({
                    game: data,
                    inGame: true
                }, () => {
                    this.connectToGameSocket();
                });
            }
        });
    }

    render() {
        var component;
        if (!this.state.user) component =  <h3>PLEASE LOG IN</h3>;
        else if (this.state.inGame) component = <Game game={this.state.game} />;
        else component = <Home createGame={this.createGame} joinGame={this.joinGame}/>;

        return (
                <MuiThemeProvider>
                <div className="App">
                <Header user={this.state.user}/>
                {component}
                </div>
                </MuiThemeProvider>
        );
    }
}

export default App;
