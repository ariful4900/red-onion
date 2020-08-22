import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ftLogo from '../../assets/Images/logo.png'
import footer from '../../assets/Data/footer';
import './Footer.scss';

const Footer = () => {
    // const footerData = footer;
    const { link01, link02 } = footer;
    return (
        <div className="footer_area">
            <Container>
                <div className="footer_top ftPadding">
                    <Row>
                        <Col md={6}>
                            <div className="footer_logo">
                                <Link to="/">
                                    <img src={ftLogo} alt="Footer Logo" />
                                </Link>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="footer_link">
                                <Row>
                                    <Col md={6}>
                                        <ul>
                                            {
                                                link01.map(lk => <li key={lk}><Link to="/">{lk}</Link></li>)
                                            }
                                        </ul>
                                    </Col>
                                    <Col md={6}>
                                        <ul>
                                            {
                                                link02.map(lkn => <li key={lkn}><Link to="/">{lkn}</Link></li>)
                                            }
                                        </ul>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="footer_foot d-flex justify-content-between ftPadding">
                    <div className="copyWrite">
                        <p><small>Copyright &copy; 2020 Online Food</small></p>
                    </div>
                    <Nav>
                       
                        <Nav.Item>
                            <Nav.Link href="/">Privacy Policy</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/">Terms of use</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/">Pricing</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                
            </Container>
        </div>
    );
};

export default Footer;