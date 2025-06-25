import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children, currentUser }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const savedCart = localStorage.getItem(`cart_${currentUser}`);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    }
  }, [currentUser]);


  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`cart_${currentUser}`, JSON.stringify(cartItems));
    }
  }, [cartItems, currentUser]);

  const addToCart = (product) => {
    const alreadyExists = cartItems.some((item) => item.id === product.id);
    if (alreadyExists) return;
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartCount = () => {
    return cartItems.length;
  };


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);