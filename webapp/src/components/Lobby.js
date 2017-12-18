import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';

class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: this.props.game
        };
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.game) {
            this.setState({ game: nextProps.game });
        }
    }

    render() {
        var list = [];
        // Declare users to check for undefined 
        var users = this.state.game.users;
        if (users != undefined) {
            users.map((row, index) => (
                list.push(
                    <ListItem
                        primaryText={row.username}
                        leftAvatar={<Avatar src={row.avatarUrl} />}
                    />
                )
            ));
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


export default Lobby;
