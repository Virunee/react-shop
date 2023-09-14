import { createContext, useState, useEffect } from "react";
import PRODUCTS_DATA from '../shop-data.json'

// this is the actual value we want to access
export const ProductsContext = createContext({
    products: [],
    setProducts: () => null,
});

// the provider is the actual component that will wrap around any other component that need access to the values inside
export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(PRODUCTS_DATA)
    const value = { products }

    useEffect(() => {
        // listen to products data changes
    }, [])

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

