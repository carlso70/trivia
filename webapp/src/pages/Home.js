import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
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
    width: '75%',
    display: 'inline-block',
};

// Home Page contains the list of active, games and user stats
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false
        }
    }

    render() {
        return (
            <div>
                <Paper style={style} zDepth={2}>
                    <Slider defaultValue={20}/>
                    <Slider defaultValue={3}/>
                    <FlatButton >Create Game</FlatButton>
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