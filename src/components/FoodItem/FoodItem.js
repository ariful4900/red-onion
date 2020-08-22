import React from 'react';
import './FoodItem.scss';
import { Link } from 'react-router-dom';

const FoodItem = (props) => {
    const {key, name, price, shortDescription, images } = props.food;
    return (
        <Link to={"/food/"+key} className="food_item_box ">
        <div className="item_box mb-4">
            <div className="item_pic mb-2">
                <img src={images[0]} alt="" />
            </div>
            <div className="item_content">
                <h5>{name}</h5>
                <p>{shortDescription}</p>
                <h4>${price.toFixed(2)}</h4>
            </div>
        </div>
        </Link>
    );
};

export default FoodItem;