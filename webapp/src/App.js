import React, { Component } from 'react';
import logo from './logo.svg';
import Header from './components/Header';
import './App.css';
import Game from './pages/Game';
import Home from './pages/Home';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inGame: false
    };
  }
  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
            <Header />
            <Home/>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
