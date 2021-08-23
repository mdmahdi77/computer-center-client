import React, { useContext } from 'react';
import axios from 'axios';
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { UserContext } from './../../App';

const Header = () => {

    const [loggedIn, setLoggedIn] = useContext(UserContext)

    const logoutHandler = () => {
        axios.get('http://localhost:8000/api/logout')
        .then(response => {
            // console.log(response)
            localStorage.removeItem('user', JSON.stringify(response.data.user))
            // show success alert
            alert(`User logout successfully`)
        })
        .catch(error => {
            console.log(error.response)
            alert(error.response.data.error)
        })
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">FlexBlog</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                    </Nav>
                    <Nav>
                        <Nav.Link href="#features"><Link to="/" className="text-decoration-none">Home</Link></Nav.Link>
                    { loggedIn ? 
                        <NavDropdown title={`${loggedIn?.name}`} id="collasible-nav-dropdown">
                            {loggedIn && loggedIn.role === 'admin' && (
                            <NavDropdown.Item><Link to="/dashboard" className="text-decoration-none">Dashboard</Link></NavDropdown.Item>
                            )}
                            <NavDropdown.Item><Link to="/create" className="text-decoration-none">Create</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to="/allServices" className="text-decoration-none">ALL Services</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to="/allOrders" className="text-decoration-none">ALL Orders</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to="/orders" className="text-decoration-none">Orders</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to="/register" className="text-decoration-none"  onClick={() => logoutHandler()}>logout</Link></NavDropdown.Item>
                        </NavDropdown>
                        :
                        <Nav.Link><Link to="/login" className="text-decoration-none">Login</Link></Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;