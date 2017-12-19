import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Lobby from '../components/Lobby';
import Scoreboard from '../components/Scoreboard';
import QuestionPage from '../components/QuestionPage';
import Paper from 'material-ui/Paper';
import { startGameUrl, leaveGameUrl } from '../utils/urls';

// Game Page is shown when a user enters a game
class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: this.props.game,
            user: this.props.user
        };
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.game) {
            this.setState({ game: nextProps.game });
        }
    }

    startGame = () => {
        fetch(startGameUrl, {
            method: 'POST',
            body: JSON.stringify({
                gameId: this.state.game.id
            })
        });
    }

    leaveGame = () => {
        console.log(this.state.game.id);
        fetch(leaveGameUrl, {
            method: 'POST',
            body: JSON.stringify({
                gameId: this.state.game.id,
                userId: this.state.user.id
            })
        }).then((response) => {
            window.location.reload();
        });
    }

    render() {
        var component;
        if (this.state.game.inLobby)
            component = <Lobby game={this.state.game} />;
        else if (this.state.game.gameOver)
            component = <Scoreboard game={this.state.game} />;
        else
            component = <QuestionPage game={this.state.game} />;
        return (
            <div>
                {component}
                <Paper zDepth={2}>
                    <FlatButton
                        label="Start Game"
                        onClick={() => this.startGame()}
                    />
                    <FlatButton
                        label="Leave Game"
                        onClick={() => this.leaveGame()}
                    />
                </Paper>
            </div>
        );
    }
}

export default Game;
