import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import CustomerProducts from './pages/CustomerProducts';
import CustomerOrders from './pages/CustomerOrders';
import CustomerCheckout from './pages/CustomerCheckout';

function App() {
  return (
    <Routes>
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/admin/manage" element={ <Admin /> } />
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/customer/products" element={ <CustomerProducts /> } />
      <Route path="/customer/orders" element={ <CustomerOrders /> } />
      <Route path="/customer/checkout" element={ <CustomerCheckout /> } />

    </Routes>
  );
}

export default App;
