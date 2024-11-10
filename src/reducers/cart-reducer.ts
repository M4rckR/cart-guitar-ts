import { db } from "../data/db";
import { CartItem, Guitar } from "../types/types";

export type CartActions = 
    { type: 'ADD_TO_CART', payload: {item:Guitar} } |
    { type: 'REMOVE_FROM_CART', payload: {id: Guitar['id']} } |
    { type: 'INCREASE_QUANTITY', payload: {id: Guitar['id']} } |
    { type: 'DECREASE_QUANTITY', payload: {id: Guitar['id']} } |
    { type: 'CLEAR_CART' };

export type CartState = {
    data: Guitar[];
    cart: CartItem[];
}

const initialCart = ():CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

export const initialState: CartState = {
    data: db,
    cart: initialCart(),
} 

const MIN_ITEMS = 1;
const MAX_ITEMS = 10;


export const cartReducer = (
    state: CartState = initialState, 
    action: CartActions
) => {
    if(action.type === 'ADD_TO_CART') {
        const itemExist = state.cart.find((guitar) => guitar.id === action.payload.item.id);
        let updatedCart:CartItem[] = [...state.cart];


        if (itemExist) {
            updatedCart = state.cart.map((item) => { 
                if (item.id === action.payload.item.id) {
                    if (item.quantity < MAX_ITEMS) {
                        return {...item,quantity: item.quantity + 1,}
                    }
                    return item;
                }
                return item;
            });
        } else {
            const newItem: CartItem = {...action.payload.item, quantity: 1};
            updatedCart = [...updatedCart, newItem];
        }


        return  {
            ...state,
            cart: updatedCart
        }
    }

    if(action.type === 'REMOVE_FROM_CART') {
        const updatedCart = state.cart.filter((guitar) => guitar.id !== action.payload.id);
        return  {
            ...state,
            cart: updatedCart
        }
    }

    if(action.type === 'INCREASE_QUANTITY') {
        const updatedCart = state.cart.map((guitar) => {
            if (guitar.id === action.payload.id  && guitar.quantity < MAX_ITEMS) {
              return {
                ...guitar,
                quantity: guitar.quantity + 1,
              }; 
            }
            return guitar;
          });
          
        return  {   
            ...state,
            cart: updatedCart
        }
    }

    if(action.type === 'DECREASE_QUANTITY') {
        const updatedCart = state.cart.map((guitar) => {
            if (guitar.id === action.payload.id && guitar.quantity > MIN_ITEMS) {
              return {
                ...guitar,
                quantity: guitar.quantity - 1,
              };
            }
            return guitar;
          });
        return  {
            ...state,
            cart: updatedCart
        }
    }

    if(action.type === 'CLEAR_CART') {
        return  {
            ...state,
            cart: []
        }
    }

    return state;
}