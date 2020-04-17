import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/login.component';
import Dashboard from './components/dashboard.component';
import Products from './components/products.component';
import Product from './components/product.component';
import Customers from './components/customers.component';
import Customer from './components/customer.component';

import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container" className='center' style={{backgroundColor:"#e0e0e0"}}>
      <Router>
        <Route path="/" exact component={Login}/>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/products" component={Products} />
        <Route path="/product" component={Product} />
        <Route path="/customers" component={Customers} />
        <Route path="/customer" component={Customer} />
      </Router>
    </div>
  );
}

export default App;
