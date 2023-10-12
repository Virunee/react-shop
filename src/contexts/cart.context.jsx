import { createContext, useState, useEffect } from "react";

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

export const CartContext = createContext({
    isOpen: false,
    setIsOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
});

export const CartContextProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
            const cartCountValue = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
            setCartCount(cartCountValue)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const value = {isOpen, setIsOpen, addItemToCart, cartItems, cartCount}

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}