import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Lobby from '../components/Lobby';
import Scoreboard from '../components/Scoreboard';
import QuestionPage from '../components/QuestionPage';

// Game Page is shown when a user enters a game
class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: this.props.game
        };
    }

    render() {
        var component;
        if (this.state.game.inLobby) component = <Lobby />;
        else if (this.state.game.gameOver) component = <Scoreboard />;
        else component = <QuestionPage />;

        return (
            <div>
                { component }
                <FlatButton label="Leave Game"/>
            </div>
        );
    }
}


export default Game;
