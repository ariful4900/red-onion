import React, { useState, useEffect } from 'react';
import { useProvider } from '../../assets/Provider/ProviderAPI';
import { Container, Row, Col } from 'react-bootstrap';
import FoodItem from '../FoodItem/FoodItem';
import './Foods.scss';
import { Link } from 'react-router-dom';

const Foods = () => {
    const { cartItem } = useProvider();
    const { cart, food } = cartItem;
    const [foods, setFoods] = useState([]);
    const [selectFoodType, setSelectFoodType] = useState("Lunch");
    useEffect(() => {
        setFoods(food);


    }, [foods]);
    const selectedFoods = foods.filter(fd => fd.type === selectFoodType);
    return (
        <section className="food-area my-5">
            <Container>
                <nav className="food_tab mb-4">
                    <ul className="d-flex justify-content-center">
                        <li onClick={() => setSelectFoodType("Breakfast")} className="nav-item">
                            <span to="breakfast" className={selectFoodType === "Breakfast" ? "active nav-link" : "nav-link"}>Breakfast</span>
                        </li>
                        <li onClick={() => setSelectFoodType("Lunch")} className="nav-item">
                            <span to="lunch" className={selectFoodType === "Lunch" ? "active nav-link" : "nav-link"}>Lunch</span>
                        </li>
                        <li onClick={() => setSelectFoodType("Dinner")} className="nav-item">
                            <span to="dinner" className={selectFoodType === "Dinner" ? "active nav-link" : "nav-link"}>Dinner</span>
                        </li>
                    </ul>
                </nav>
                <Row>
                    {
                        selectedFoods.map(food => <Col md={4} ><FoodItem key={food.id} food={food}></FoodItem></Col>)
                    }
                </Row>
                <div className="text-center">
                    {
                        cart.length ?
                            <Link to="/checkout">
                                <button className="btn btn-danger btn-secondary">Check Out Your Food</button>
                            </Link>
                            : <button className="btn btn-secondary">Checkout Your Food</button>

                    }
                </div>
            </Container>
        </section>
    );
};

export default Foods;