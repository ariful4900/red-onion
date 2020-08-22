import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProvider } from '../../assets/Provider/ProviderAPI';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FaCartPlus } from "react-icons/fa";
import './FoodDetails.scss'

const FoodDetails = () => {
    const { slug } = useParams();
    const {  cartItem } = useProvider();
    console.log(cartItem)
    const { handleAddFood ,food} = cartItem;

    
    const [currentFood, setCurrentFood] = useState({});
    const [quantity, setQuantity] = useState(1)
    const [isSuccess, setIsSuccess] = useState(false)
    const [selectedBigImg, setSelectedBigImg] = useState(null)

    const { name, fullDescription, price, images } = currentFood;
    useEffect(() => {
        const singleFood = food.find(fd => fd.key === slug);
        setCurrentFood(singleFood);
        if (currentFood.images) {
            setSelectedBigImg(currentFood.images[0])
        }
    }, [])
    
    console.log(food)

  
    const floatNumber = (num) => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    const handleDownQuantity = () => {
        setQuantity(quantity <= 1 ? 1 : quantity - 1);

    }
    const handleUpQuantity = () => {
        setQuantity(quantity + 1)
    }
    if(isSuccess){
        setTimeout(()=>setIsSuccess(false), 1500)
    }
    
    return (
        <main>
            <section className="my-4">
                <Container>
                    {
                        name &&
                        <Row>
                            <Col md={6}>
                                <div className="food_content">
                                    <h1>{name}</h1>
                                    <p className="my-5">{fullDescription}</p>
                                    <div className="price_box d-flex">
                                        <h2> $ {floatNumber(price).toFixed(2)}</h2>
                                        <div className="price_control">
                                            <button className="btn" onClick={handleDownQuantity}>-</button>
                                            <input type="submit" value={quantity} />
                                            <button className="btn" onClick={handleUpQuantity}>+</button>
                                        </div>
                                    </div>
                                    <div className="cartBtn">
                                        <button className="btn btn-danger " onClick={() => handleAddFood(currentFood)}><FaCartPlus/> Add</button>
                                        {
                                            isSuccess&& <p className="ml-3 success-msg text-success">Item added to cart</p>
                                        }
                                    </div>
                                    <div className="more_image">
                                        {
                                            images.map((img, i) => <img src={img} onClick={() => setSelectedBigImg(images[i])} className={images[i] === selectedBigImg ? "mr-4 small-img active-small-img" : "mr-4 small-img"} height="150" alt="" />)
                                        }
                                    </div>
                                </div>
                            </Col>
                            <Col md={6}>
                                <Image src={selectedBigImg} fluid alt={currentFood.name} />
                            </Col>
                        </Row>
                    }
                </Container>
            </section>
        </main>
    );
};

export default FoodDetails;