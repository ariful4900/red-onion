import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Banner.scss';

const Banner = () => {
    const [searchQuery, setSearchQuery] = useState(null);
    const getQuery = (e) => setSearchQuery(e.target.value);

    return (
        <div className="banner_area">
            <Container>
                <div className="banner_box d-flex justify-content-center align-items-center">
                    <div className="search_Area">
                        <h2>Best Food Waiting for your Belly</h2>
                        <div className="search-box mx-auto my-5 ">
                            <input type="text" className="form-control" onChange={getQuery} placeholder="Search Food Item" />
                            <Link to={"/search?" + searchQuery}>
                                <button onClick={() => window.scrollBy(0, 500)} className="btn btn-danger search-btn btn-rounded">Search</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Banner;