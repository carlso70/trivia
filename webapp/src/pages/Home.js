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

const testTable = [
    {
        gameId: 4,
        host: 'user1'
    },
    {
        gameId: 123123,
        host: 'test user999'
    },
    {
        gameId: 144444,
        host: 'another user'
    },
];

const style = {
    margin: 15,
    padding: 10,
};

const countItems = [];
for (let i = 1; i < 20; i++ ) {
    countItems.push(<MenuItem value={i} key={i} primaryText={`${i}`} />);
}


// Home Page contains the list of active, games and user stats
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false,
            dif: 1,
            count: 5
        };
    }

    handleDifChange = (event, index, value) => this.setState({dif: value});
    handleCountChange = (event, index, value) => this.setState({count: value});

    render() {
        return (
                <div>
                <Paper style={style} zDepth={2}>
                <h3>Game Settings</h3>
                <SelectField onChange={this.handleDifChange} value={this.state.dif} floatingLabelText="Difficulty">
                <MenuItem value={1} primaryText="Easy" />
                <MenuItem value={2} primaryText="Medium" />
                <MenuItem value={3} primaryText="Hard" />
                </SelectField>
                <br/>
                <SelectField
                 floatingLabelText="Question Count"
                 value={this.state.count}
                 onChange={this.handleCountChange}
                 maxHeight={200}
                  >
                {countItems}
                </SelectField>
                <br />
                <RaisedButton label="Create Game"/>
                </Paper>

                <Paper style={style} zDepth={2}>
                    <h3>Games</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn tooltip="Game ID">GAME ID</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Host">Host</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {testTable.map((row, index) => (
                                <TableRow key={index}>
                                    <TableRowColumn>{row.gameId}</TableRowColumn>
                                    <TableRowColumn>{row.host}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <FlatButton style={{ margin: 15 }}>Join Game</FlatButton>
                    <FlatButton style={{ margin: 15 }}>Refresh</FlatButton>
                </Paper>
            </div>
        );
    }
}


export default Home;
