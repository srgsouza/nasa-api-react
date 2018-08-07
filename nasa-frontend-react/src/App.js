import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar } from 'reactstrap';
import NavbarComponent from './NavbarComponent/NavbarComponent'

class App extends Component {

  render() {
    return (
      <div className="App">
        <NavbarComponent />
      </div>
    );
  }
}

export default App;
