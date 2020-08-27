import React from 'react';
import { useProvider } from '../../assets/Provider/ProviderAPI';
import "./Cart.scss";
import { Link } from 'react-router-dom';

const Cart = () => {
    const provide = useProvider();
    const { cart,   checkoutHandler, clearCart} = provide.cartItem;
    const {key}=cart;
    const subTotal = cart.reduce((acc, crr)=>{
        return acc + (crr.price*crr.quantity);
    }, 0);
    console.log(cart)
    const totalQuantity = cart.reduce((acc, crr)=>{
        return acc + crr.quantity;
    }, 0);
    const tax = (subTotal/100)*5;
    const deliveryFee = totalQuantity && 2;
    const grandTotal = subTotal+tax+deliveryFee;
    return (
        <div className="my-5">
           <div className="cart-heading d-flex justify-content-between">
               <div className="form">
                        <h4>Form <strong> Star Kabab And Restaura</strong></h4>
                        <h5>Arriving in 20-30 min</h5>
                        <h5>107 Rd No 9</h5>
               </div>
               
            </div> 
            <div className="cartInformation">
                {
                    cart.map(item=>
                    <div key={item.key} className="d-flex justify-content-between">
                        
                        <div className="d-flex">
                             <img src={item.images[0]} alt=""/>
                            <div>
                                <h6>{item.name}</h6>
                                <h6>${item.price}</h6>
                            </div>
                         </div>
                         <div>
                             <button onClick={()=>checkoutHandler(item.key, (item.quantity+1))} className="btn font-wight-bold" >+</button>
                             <input type="submit" value={item.quantity}/>
                             {
                                    item.quantity>0 ? 
                                    <button onClick={()=>checkoutHandler(item.key, (item.quantity-1))} className="btn font-weight-bolder">-</button>
                                    : <button className="btn font-weight-bold">-</button>
                             }
                         </div>
                    </div>
                    )
                }
                
            </div>
            <div className="cartCalculation">
            <p className="d-flex justify-content-between"><span>Subtotal {totalQuantity} Item</span> <span>$ {subTotal.toFixed(2)}</span></p>
            <p className="d-flex justify-content-between"><span>Tax 5%</span> <span>$ {tax.toFixed(2)}</span></p>
            <p className="d-flex justify-content-between"><span>Delivery Fee</span> <span>$ {deliveryFee.toFixed(2)}</span></p>
            <p className="d-flex justify-content-between"><span>Total</span> <span>$ {grandTotal.toFixed(2)}</span></p>
            </div>
            <div className="amountBtn">
                {
                  totalQuantity ?
                    <Link to ="/">
                         <button className="btn btn-danger btn-secondary form-control" onClick={()=>clearCart(cart)}>Check Out Your Food {key}</button>
                    </Link>
                  :<button className="btn btn-secondary form-control">Check Out Your Food</button>

                }    
            </div>
        </div>
    );
};

export default Cart;