import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

// Game Page is shown when a user enters a game
class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: this.props.game
        };
    }

    render() {
        return (
            <div>
                <p>Game</p>
            </div>
        );
    }
}


export default Game;
