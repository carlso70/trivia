import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Slider from 'material-ui/Slider';
import { listGames } from '../utils/urls';

// basic styles for the paper elements
const style = {
    margin: 15,
    padding: 10
};

// Creates a list of menu items for the selecting question count on the create game settings paper
const countItems = [];
for (let i = 1; i < 20; i++) {
    countItems.push(<MenuItem value={i} key={i} primaryText={`${i}`} />);
}

// Home Page contains the list of active, games and user stats
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false,
            dif: 1,
            count: 5,
            games: [],
            selected: -1
        };

        this.getAllGames();
    }

    handleDifChange = (event, index, value) => this.setState({ dif: value });
    handleCountChange = (event, index, value) => this.setState({ count: value });

    onRowSelection = (key) => {
        if (key.length < 1) {
            this.setState({
                selected: -1
            });
        }
        else {
            console.log(key);
            this.setState({
                selected: key
            });
        }
    }

    getAllGames = () => {
        fetch(listGames, {
            method: 'GET'
        }).then((response) => {
            if (response.status == 200)
                return response.json();
            alert("SERVER ERROR")
            return null;
        }).then((data) => {
            if (data) {
                console.log(data);
                this.setState({
                    games: data
                });
            }
        });
    }

    render() {
        return (
            <div>
                <Paper style={style} zDepth={2}>
                    <h3>Games</h3>
                    <Table onRowSelection={this.onRowSelection}>
                        <TableHeader>
                            <TableRow >
                                <TableHeaderColumn tooltip="Game ID">GAME ID</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Host">Host</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody deselectOnClickaway={false}>
                            {this.state.games.map((row, index) => (
                                <TableRow key={index} selected={this.state.selected == index}>
                                    <TableRowColumn>{row.id}</TableRowColumn>
                                    <TableRowColumn>{row.users == null ? "empty" : row.host}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <FlatButton style={{ margin: 15 }} onClick={() => this.props.joinGame(this.state.games[this.state.selected])}>Join Game</FlatButton>
                    <FlatButton style={{ margin: 15 }} onClick={() => this.getAllGames()}>Refresh</FlatButton>
                </Paper>

                <Paper style={style} zDepth={2}>
                    <h3>Game Settings</h3>
                    <SelectField onChange={this.handleDifChange} value={this.state.dif} floatingLabelText="Difficulty">
                        <MenuItem value={1} primaryText="Easy" />
                        <MenuItem value={2} primaryText="Medium" />
                        <MenuItem value={3} primaryText="Hard" />
                    </SelectField>
                    <br />
                    <SelectField
                        floatingLabelText="Question Count"
                        value={this.state.count}
                        onChange={this.handleCountChange}
                        maxHeight={200}
                    >
                        {countItems}
                    </SelectField>
                    <br />
                    <RaisedButton label="Create Game" onClick={() => this.props.createGame(this.state.count, this.state.dif)} />
                </Paper>
            </div>
        );
    }
}


export default Home;
