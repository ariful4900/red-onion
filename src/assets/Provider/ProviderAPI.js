import React, { createContext, useContext, useState, useEffect } from 'react';
import foods from '../Data/foods';
import feature from '../Data/fetures'
import { addToDatabaseCart, getDatabaseCart } from '../utilities/databaseManager';
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
    const auth = Auth()
    return <ProviderContext.Provider value={{ cartItem, auth }}>{props.children}</ProviderContext.Provider>
}


export const useProvider = () => {
    return useContext(ProviderContext)

};
//All Cart Info
export const CartInfo = () => {
    const [food, setFood] = useState([]);
    const [cart, setCart] = useState([]);
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
            const priviousCart = productKeys.map(existingKey => {
                const product = food.find(pd => pd.key === existingKey);

                product.quantity = savedCart[existingKey];
                return product;
            })
            setCart(priviousCart);
        }
    }, [food]);

    const handleAddFood = (product) => {


        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }

        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return {
        cart,
        setCart,
        handleAddFood,
        food,
        feature
    }
}
export const  PrivateRoute = ({ children, ...rest }) => {
    const provide = useProvider();
    const {auth}= provide;
    console.log(auth)
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