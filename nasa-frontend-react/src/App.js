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

  handleChange = (e) => {
    // computed properties, es6. get the key / value from the form in the Login component
    this.setState({ [e.target.name]: e.target.value });
  }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.login(this.state.username, this.state.password);
  // }

  // login = (username, password) => {
  //   // the last thing that you want to do in your function
  //   this.setState({
  //     username: username,
  //     password: password,
  //     logged: true
  //   });
  // }
  handleSubmit = async (e) => {
    e.preventDefault();
    const loginResponse = await fetch('http://localhost:9000/api/v1/users/login', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const parsedResponse = await loginResponse.json();

    if (parsedResponse.data === 'login successful') {
      this.props.history.push('/movies');
    }

  }

  render() {
    return (
      <div className="App">
        <NavbarComponent 
        username={this.state.username} 
        handleSubmit={this.handleSubmit} 
        handleChange={this.handleChange}
        />
        Username is: {this.state.username}
      </div>
    );
  }
}

export default App;
