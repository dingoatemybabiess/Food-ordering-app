import React, { createContext, useState, useEffect } from "react";

// ⚠️ IMPORTANT: This line MUST have 'export'
export const CartContext = createContext();

// ⚠️ This line MUST ALSO have 'export'
export const CartProvider = ({ children }) => {
  // Load cart from localStorage if it exists
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // 1. Add Item to Cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if item is already in cart
      const existingItem = prevItems.find((item) => item.id === product.id);
      
      if (existingItem) {
        // If yes, just increase quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If no, add new item with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // 2. Remove Item
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // 3. Update Quantity (+ or -)
  const updateQuantity = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) } // Prevent going below 1
          : item
      )
    );
  };

  // 4. Clear Cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  // Calculate Total Price
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};