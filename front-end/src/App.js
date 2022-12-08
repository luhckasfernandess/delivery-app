import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import CustomerProducts from './pages/CustomerProducts';

function App() {
  return (
    <Routes>
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/admin/manage" element={ <Admin /> } />
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/customer/products" element={ <CustomerProducts /> } />
    </Routes>
  );
}

export default App;
