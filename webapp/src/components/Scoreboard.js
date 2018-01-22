import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';

class Scoreboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: this.props.game
        };
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.game != this.state.game) {
            this.setState({ game: nextProps.game });
        }
    }

    render() {
        var list = [];
        // Declare users to check for undefined 
        var board = this.state.game.scoreboard;
        if (board != undefined) {
            for (var key in board) {
                if (board.hasOwnProperty(key)) {
                    console.log(key + " -> " + board[key]);
                    list.push(
                        <ListItem
                            primaryText={key + ": " + board[key]}
                        />
                    )
                }
            }

        }
        return (
            <div>
                <Paper zDepth={2}>
                    <List>
                        {list}
                    </List>
                </Paper>
            </div>
        );

    }
}


export default Scoreboard;
