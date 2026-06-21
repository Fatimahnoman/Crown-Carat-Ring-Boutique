"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('rr_cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const save = (c: CartItem[]) => {
    setCart(c);
    localStorage.setItem('rr_cart', JSON.stringify(c));
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      save(cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      save([...cart, { ...item, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => save(cart.filter(i => i.id !== id));

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) { removeFromCart(id); return; }
    save(cart.map(i => i.id === id ? { ...i, quantity } : i));
  };

  const clearCart = () => save([]);

  const cartCount = cart.reduce((t, i) => t + i.quantity, 0);
  const cartTotal = cart.reduce((t, i) => t + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
