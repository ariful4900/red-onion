import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.scss';
import { ContextProvider, PrivateRoute } from './assets/Provider/ProviderAPI';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './Pages/Home/Home';
import FoodDetails from './Pages/FoodDetails/FoodDetails';
import Checkout from './Pages/Checkout/Checkout';
import Login from './Pages/Login/Login';

function App() {

  return (

    <ContextProvider>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/food/:slug">
            <FoodDetails></FoodDetails>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/checkout">
            <Checkout></Checkout>
          </PrivateRoute>
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </ContextProvider>
  );
}

export default App;
