import React, { useState, useEffect } from 'react';
import { useProvider } from '../../assets/Provider/ProviderAPI';
import { Container, Row, Col } from 'react-bootstrap';
import FeatureItem from '../FeatureItem/FeatureItem';

const Features = () => {
    const { cartItem } = useProvider();
    const [features, setFeatures] = useState([]);
    // console.log(features)
    useEffect(() => {
        const {feature} = cartItem;
        setFeatures(feature)
    }, [features])
    return (
        <section className="feature_area mb-4">
            <Container>
                <Row>
                    <Col md={6}>
                        <div className="section_heading">
                            <h2>Why you Choose Us</h2>
                            <p className="my-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, facere aliquam debitis, fuga adipisci dolor corrupti consequuntur officiis dicta est repellendus nostrum ex obcaecati nam! Quas accusamus a doloribus amet dolore! </p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {
                        features.map(feature=><Col md={4} key={feature.id}><FeatureItem feature={feature}></FeatureItem></Col>)
                    }
                </Row>
            </Container>
        </section>
    );
};

export default Features;