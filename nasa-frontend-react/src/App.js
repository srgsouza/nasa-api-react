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
    console.log(parsedResponse);
    

    if (parsedResponse.data === 'login successful') {
      // this.props.history.push('/movies');
      this.setState({ logged: true })
    }

  }

  render() {
    return (
      <main className="App">
        <NavbarComponent
          username={this.state.username}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
        Logged ? : {this.state.logged}
      </main>
    )
    // return (
    //   <div className="App">
    //     <NavbarComponent 
    //     username={this.state.username} 
    //     handleSubmit={this.handleSubmit} 
    //     handleChange={this.handleChange}
    //     />
    //   </div>
    // );
  }
}

export default App;
