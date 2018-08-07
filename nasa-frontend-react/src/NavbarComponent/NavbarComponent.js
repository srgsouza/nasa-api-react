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
import LoginModal from '../LoginModal/LoginModal';
import Login from '../Login/Login';

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
                            <NavItem>
                                <NavLink href="/components/">Components</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                            </NavItem>
                            <Login 
                            username={this.props.username} 
                            handleSubmit={this.props.handleSubmit}
                            handleChange={this.props.handleChange}
                            />
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}