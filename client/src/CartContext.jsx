import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) setCart(JSON.parse(stored));
    } catch (e) {
      console.error("Failed to parse cart from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  const addItem = (product, qty = 1) => {
    const id = product._id || product.id;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      }
      return [
        ...prev,
        {
          id,
          name: product.name,
          price: Number(product.price) || 0,
          image: product.images?.[0] || "",
          qty,
        },
      ];
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) return removeItem(id);
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const clearCart = () => setCart([]);

  const count = cart.reduce((s, i) => s + Number(i.qty || 0), 0);
  const total = cart.reduce((s, i) => s + (Number(i.price || 0) * Number(i.qty || 0)), 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQty, clearCart, count, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartContext;
