import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../../assets/Images/logo2.png';
import { FaCartPlus } from "react-icons/fa";

import './Header.scss'
import { useProvider } from '../../assets/Provider/ProviderAPI';
const Header = () => {
    const provide = useProvider();
    const {cartItem, auth} = provide;
    const { cart } = cartItem;
    return (
        <div className="header_area">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/" className="logo">
                        <img src={logo} alt="LOGO" />
                    </Navbar.Brand>
                    <Nav
                        activeKey="/home"
                        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                    >
                        <Nav.Item>
                            <Nav.Link href="/home"><FaCartPlus /> {cart.length}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            {
                                auth.user?
                                <Nav.Link href="/checkout">{auth.user.displayName}</Nav.Link>
                            :<Nav.Link href="/login">Login</Nav.Link>
                            }
                        </Nav.Item>
                        <Nav.Item>
                            {
                                auth.user?
                                <Nav.Link href="/">
                                    <button className="btn-danger btn btn-rounded" onClick={()=>{auth.signOut()}}>Sign Out</button>
                                </Nav.Link>
                                :<Nav.Link href="/login">Sing Up</Nav.Link>
                            }
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;