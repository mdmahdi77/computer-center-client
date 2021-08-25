import React, { useContext } from 'react';
import axios from 'axios';
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
// import { Link } from 'react-scroll';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from './../../App';
import logo from '../../images/logo.png'
import '../../App.css'

const Header = () => {

    const [loggedIn, setLoggedIn] = useContext(UserContext)

    const history = useHistory()

    const logoutHandler = () => {
        axios.get('http://localhost:8000/api/logout')
            .then(response => {
                // console.log(response)
                const tokenInfo = localStorage.removeItem('token', JSON.stringify(response.data.token))
                const userInfo = localStorage.removeItem('user', JSON.stringify(response.data.user))

                if (!tokenInfo && !userInfo) {
                    history.push(`/login`)
                    setLoggedIn('')
                    alert(`User logout successfully`)
                }

            })
            .catch(error => {
                console.log(error.response)
                alert(error.response.data.error)
            })
    }

    return (
        <Navbar sticky="top" collapseOnSelect expand="lg" bg="secondary" className="py-3 navbar">
            <Container>
                <Navbar.Brand href="#home" className="logo">
                    <img src={logo} alt="logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                    </Nav>
                    <Nav>
                        <Nav.Link href="#features">
                            <Link to="/" className="text-decoration-none text-dark font-weight-bold">Home</Link>
                        </Nav.Link>

                        <Nav.Link href="#services">
                            <Link className="text-decoration-none text-dark font-weight-bold">Services</Link>
                        </Nav.Link>

                        <Nav.Link href="#features">
                            <Link className="text-decoration-none text-dark font-weight-bold">Features</Link>
                        </Nav.Link>
                        {loggedIn ?
                            <NavDropdown title={`${loggedIn?.name}`} className="text-dark font-weight-bold" id="collasible-nav-dropdown">
                                {loggedIn && loggedIn.role === 'admin' && (
                                    <NavDropdown.Item><Link to="/dashboard" className="text-decoration-none">Dashboard</Link></NavDropdown.Item>
                                )}
                                <NavDropdown.Item><Link to="/create" className="text-decoration-none">Create</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to="/allServices" className="text-decoration-none">ALL Services</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to="/allOrders" className="text-decoration-none">ALL Orders</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to="/orders" className="text-decoration-none">Orders</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to="/register" className="text-decoration-none" onClick={() => logoutHandler()}>logout</Link></NavDropdown.Item>
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