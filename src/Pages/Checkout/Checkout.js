import React from 'react';
import Shipment from '../../components/Shipment/Shipment';
import { Container, Row, Col } from 'react-bootstrap';

const Checkout = () => {
    return (
        <div className="checkout_area">
            <Container>
                <Row>
                    <Col md={6}>
                        <h1>Delivery Information</h1>
                        <Shipment></Shipment>
                    </Col>
                    <Col md={6}></Col>
                </Row>
            </Container>
        </div>
    );
};

export default Checkout;