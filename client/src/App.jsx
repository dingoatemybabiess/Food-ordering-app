import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import { CartProvider } from './components/context/CartContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/common/Navbar'; 
import AuthPage from './components/pages/AuthPage';
import Profile from './components/pages/Profile';
import Home from './components/pages/Home';
import RestaurantMenu from './components/pages/RestaurantMenu';
import Cart from './components/pages/Cart';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          {/* PLACE NAVBAR HERE so it shows on all pages */}
          <Navbar /> 
          
          <div className="container-fluid p-0">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/restaurant/:id" element={<RestaurantMenu />} />
              <Route path="/cart" element={<Cart />} />
              
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />
          
              <Route 
                path="/profile" 
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;