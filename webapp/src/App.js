import React, { Component } from 'react';
import logo from './logo.svg';
import Login from './components/Login';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
            <Login />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
