import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import Login from '../Login';
// import Logout from '../Logout';
import Register from '../Register'

export default class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }
    // handles the on/off for the navbar toggler
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render(props) {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">reactstrap</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <Login 
                            username={this.props.username} 
                            handleSubmit={this.props.handleSubmit}
                            handleChange={this.props.handleChange}
                            />
                            <Register />
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
