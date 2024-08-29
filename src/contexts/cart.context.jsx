import { createContext, useReducer } from "react";

import {createAction} from '../utils/reducer/reducer.utils'

const INITIAL_STATE = {
    isOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

export const CART_ACTION_TYPES = {
    'SET_OPEN_STATE': 'SET_OPEN_STATE',
    'UPDATE_CART': 'UPDATE_CART'
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_OPEN_STATE:
            return {
                ...state,
                isOpen: payload
            }
        case CART_ACTION_TYPES.UPDATE_CART:
            return {
                ...state,
                ...payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`)
    }
}

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
        )
    if(existingCartItem){
        return cartItems.map((cartItem) => {
            return cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        })
    } else {
        return [...cartItems, {...productToAdd, quantity: 1}]
    }
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
        )
    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }    
    return cartItems.map((cartItem) => {
        return cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity -1} : cartItem
    })
}

const deleteCartItem = (cartItems, cartItemToDelete) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToDelete.id)
}

export const CartContext = createContext({
    isOpen: false,
    setIsOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    removeItemFromCart: () => {},
    deleteCartItemFromCart: () => {},
    cartTotal: 0,
});

export const CartContextProvider = ({children}) => {
    const [ state, dispatch ] = useReducer(cartReducer, INITIAL_STATE)
    const { isOpen, cartItems, cartCount, cartTotal } = state

    const setIsOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_OPEN_STATE, bool))
    }

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        dispatch(createAction(CART_ACTION_TYPES.UPDATE_CART,  {cartItems: newCartItems, cartCount: newCartCount, cartTotal: newCartTotal}))
    }

    const addItemToCart = (productToAdd) => {
        updateCartItemsReducer(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (cartItemToRemove) => {
        updateCartItemsReducer(removeCartItem(cartItems, cartItemToRemove))
    }

    const deleteCartItemFromCart = (cartItemToDelete) => {
        updateCartItemsReducer(deleteCartItem(cartItems, cartItemToDelete))
    }

    const value = {isOpen, setIsOpen, addItemToCart, removeItemFromCart, deleteCartItemFromCart, cartItems, cartCount, cartTotal}

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}