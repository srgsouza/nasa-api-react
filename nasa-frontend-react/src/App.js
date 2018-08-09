import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar/Navbar.jsx';
import NasaApi from './NasaApi';
import Game from './Game/Game';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Game/>
        <NasaApi/>
      </div>
    );
  }
}

export default App;
