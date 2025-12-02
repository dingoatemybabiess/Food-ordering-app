import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { FaMapMarkerAlt, FaShoppingCart, FaUser, FaUtensils } from 'react-icons/fa';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { cartItems, cartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm" style={{ backgroundColor: '#fff', padding: '15px 0' }}>
      <div className="container">
        
        {/* 1. LOGO (Left) */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div className="rounded-circle d-flex align-items-center justify-content-center me-2" 
               style={{ width: '40px', height: '40px', background: '#FF4B2B', color: 'white' }}>
            <FaUtensils />
          </div>
          <span className="fw-bold fs-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#333' }}>
            FoodMarket
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          
          {/* 2. CENTER SEARCH BAR (Address) */}
          <div className="mx-auto my-3 my-lg-0 d-flex align-items-center" style={{ maxWidth: '500px', width: '100%' }}>
            <div className="input-group shadow-sm rounded-pill overflow-hidden bg-light" style={{ border: '1px solid #eee' }}>
                <span className="input-group-text border-0 bg-transparent ps-3 text-danger">
                    <FaMapMarkerAlt />
                </span>
                <input 
                    type="text" 
                    className="form-control border-0 bg-transparent shadow-none" 
                    placeholder="Enter delivery address" 
                />
            </div>
          </div>

          {/* 3. RIGHT ACTIONS */}
          <div className="d-flex align-items-center gap-3">
            
            {/* Cart Button (Cyan) */}
            <Link to="/cart" className="btn rounded-pill d-flex align-items-center px-3 fw-bold shadow-sm border-0"
                  style={{ backgroundColor: '#00c9ff', color: 'white' }}>
              <FaShoppingCart className="me-2" />
              <span>{cartItems.length} items • ${cartTotal.toFixed(2)}</span>
            </Link>

            {/* Login / Profile Button */}
            {user ? (
              // If Logged In: Show User Icon
              <button 
                  className="btn btn-light rounded-circle shadow-sm border d-flex align-items-center justify-content-center"
                  style={{ width: '45px', height: '45px' }}
                  onClick={() => navigate('/profile')}
                  title="Profile"
              >
                  <FaUser className="text-secondary" />
              </button>
            ) : (
              // If Logged Out: Show RED Sign In Button
              <Link to="/login" className="btn rounded-pill px-4 fw-bold shadow-sm border-0 d-flex align-items-center"
                    style={{ backgroundColor: '#FF4B2B', color: 'white' }}>
                <FaUser className="me-2" />
                Sign In
              </Link>
            )}
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;