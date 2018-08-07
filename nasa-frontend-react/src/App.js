import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar } from 'reactstrap';
import NavbarComponent from './NavbarComponent/NavbarComponent'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      username: '',
      password: '',
    };
  }

  login = (username, password) => {
    // the last thing that you want to do in your function
    this.setState({
      username: username,
      password: password,
      logged: true
    });
  }

  handleChange = (e) => {
    // computed properties, es6. get the key / value from the form in the Login component
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.login(this.state.username);
  }

  render() {
    return (
      <div className="App">
        <NavbarComponent 
        username={this.state.username} 
        login={this.login} 
        handleSubmit={this.handleSubmit} 
        handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default App;
