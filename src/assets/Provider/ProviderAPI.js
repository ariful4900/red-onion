import React, { createContext, useContext, useState, useEffect } from 'react';
import foods from '../Data/foods';
import feature from '../Data/fetures'
import { addToDatabaseCart, getDatabaseCart, removeFromDatabaseCart, processOrder } from '../utilities/databaseManager';
import {
    Route,
    Redirect,
} from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';

firebase.initializeApp(firebaseConfig);

const ProviderContext = createContext();

export const ContextProvider = (props) => {
    const cartItem = CartInfo();
    const auth = Auth();
    return <ProviderContext.Provider value={{ cartItem, auth }}>{props.children}</ProviderContext.Provider>
}


export const useProvider = () => {
    return useContext(ProviderContext)

};
//All Cart Info
export const CartInfo = () => {
    const [food, setFood] = useState([]);
    const [cart, setCart] = useState([]);
    const [deliveryDetails, setDeliveryDetails]= useState({
        name:null,
        email:null,
        house:null,
        village:null,
        city:null,
        zipCode:null
    });
    const [userEmail, setUserEmail]= useState(null);
    const [ orderId, setOrderId] = useState(null)
    const deliveryDetailsHandler = (data)=>{
        setDeliveryDetails(data);
    };
    const getUserEmail = (email)=>{
       setUserEmail(email)
    };
    useEffect(() => {
        // fetch('http://localhost:4200/products')
        //     .then(res => res.json())
        //     .then(data => {
        //         setFood(data);
        //     })
        setFood(foods)
    }, []);
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        if (food.length) {
            const previousCart = productKeys.map(existingKey => {
                let product = food.find(pd => pd.key === existingKey);

                product.quantity = savedCart[existingKey];
                // product = savedCart[existingKey];
                return product;
            })
            setCart(previousCart);
        }
    }, [food]);

    const handleAddFood = (currentFood) => {


        // const toBeAddedKey = product.key;
        const alreadyAdded = cart.find(pd => pd.key === currentFood.key);
        let newCart = [...cart, currentFood];
            setCart(newCart)
        if (alreadyAdded) {

            const remainingCart = cart.filter(pd => pd.key !== currentFood.key);
            newCart = [...cart, remainingCart];
        } else {
            newCart = [...cart, currentFood];
        }

        addToDatabaseCart(currentFood.key, currentFood.quantity);
    }
    const checkoutHandler = (productId, productQuantity)=>{
        const newCart = cart.map(item=>{
            if(item.key === productId){
                item.quantity = productQuantity
            }
            return item
        })
        const filterCart = newCart.filter(item=>item.quantity>0)
        setCart(filterCart)
     }
     const clearCart =  (cart) => {
        //  const newCart = cart.filter(fd=>fd.key !==foodKey);
        // setCart(newCart);
        // removeFromDatabaseCart(foodKey)
        const orderedItems = cart.map(item => {
          return {food_id : item.key, quantity: item.quantity};

        })

        const orderDetailsData = {
            userEmail,
            orderedItems,
            deliveryDetails
            
        }
        setOrderId(cart.key);
        processOrder();

        setCart([])
  
    }
    return {
        cart,
        setCart,
        handleAddFood,
        checkoutHandler,
        getUserEmail,
        deliveryDetails,
        userEmail,
        deliveryDetailsHandler,
        clearCart,
        food,
        feature
    }
}
export const  PrivateRoute = ({ children, ...rest }) => {
    const provide = useProvider();
    const {auth}= provide;
    // console.log(auth)
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
  //Delivery  Info

//All auth Data
const Auth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                const currUser = user;
                setUser(currUser);
            }
        });
    }, []);
    const signIn = (email, password) => {
       return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                setUser(res.user);
                window.history.back(); 
            })
            .catch(err => {
                setUser({ error: err.message })
            });
           
    };
    const signUp = (email, password, name) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                firebase.auth().currentUser.updateProfile({
                    displayName: name
                })
                .then(()=>{
                    setUser(res.user);
                    window.history.back(); 
                })
            })
            .catch(err => {
                setUser({ error: err.message });
            });
            
    }
    const signOut = ()=>{
        return firebase.auth().signOut()
        .then(res =>{
            setUser(null)
        });
    }
    return {
        user,
        signIn,
        signUp, 
        signOut
    }
};
export default Auth;