import React, { Component } from 'react';
import logo from './logo.svg';
import Header from './components/Header';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
            <Header />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
