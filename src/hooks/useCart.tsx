
import { useMemo } from "react";
import { useEffect, useState } from "react";
import {db} from '../data/db';
import type { CartItem, Guitar } from '../types/types';

export const useCart = () => {
    const initialCart = ():CartItem[] => {
        const localStorageCart = localStorage.getItem("cart");
        return localStorageCart ? JSON.parse(localStorageCart) : [];
      }
    
      const [data] = useState(db);
      const [cart, setCart] = useState(initialCart);
    
     const MAX_ITEMS = 10;
    
    
     useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
     }, [cart]);
    
    
      function removeFromCart(id: Guitar['id']) {
        setCart(prevCart => prevCart.filter((guitar) => guitar.id !== id));
      }
    
      function increaseQuantity(id: Guitar['id']) {
        const updatedCart = cart.map((guitar) => {
          if (guitar.id === id  && guitar.quantity < MAX_ITEMS) {
            return {
              ...guitar,
              quantity: guitar.quantity + 1,
            }; 
          }
          return guitar;
        });
        setCart(updatedCart);
    
      }
    
      function addToCart(item:Guitar) {
        const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
        if (itemExist >= 0) {
          const updatedCart = [...cart];
          updatedCart[itemExist].quantity++;
          setCart(updatedCart);
          
        } else {
          const newItem: CartItem = {...item, quantity: 1};
          setCart([...cart, newItem]);
        }
      }
    
      function decreaseQuantity(id: Guitar['id']) {
        const updatedCart = cart.map((guitar) => {
          if (guitar.id === id && guitar.quantity > 1) {
            return {
              ...guitar,
              quantity: guitar.quantity - 1,
            };
          }
          return guitar;
        });
        setCart(updatedCart);
      }
    
      function vaciarCarrito() {
        setCart([]);
      }
      

      const isEmpty = useMemo(() => cart.length === 0, [cart]);
      const carTotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart]);
    

    return {data, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, vaciarCarrito, isEmpty, carTotal};
}

