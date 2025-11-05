import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashbord from './Dashboard';
import SearchOwner from './screen/SearchOwner';
import Product from './screen/Product';
import ProtectedRoute from './ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductAverage from './screen/ProductAverage';
import ProductType from './screen/ProductType';
import Employee from './screen/Employee';
import User from './screen/User';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashbord />
          </ProtectedRoute>
        } />
          <Route path="/employee" element={
          <ProtectedRoute>
            <Employee />
          </ProtectedRoute>
        } />
        <Route path="/user" element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        } />
        <Route path="/product" element={
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        } />
        <Route path="/owner" element={
          <ProtectedRoute>
            <SearchOwner />
          </ProtectedRoute>
        } />
        <Route path="/product/average" element={
          <ProtectedRoute>
            <ProductAverage />
          </ProtectedRoute>
        } />
        <Route path="/product/type" element={
          <ProtectedRoute>
            <ProductType />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
