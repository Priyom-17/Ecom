// src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCartItems = localStorage.getItem("cartItems");
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        const existingItemIndex = cartItems.findIndex(
            (item) => item._id === product._id
        );
        if (existingItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity += 1;
            setCartItems(updatedCartItems);
        } else {
            setCartItems((prevItems) => [
                ...prevItems,
                { ...product, quantity: 1 },
            ]);
        }
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item._id !== productId)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const increaseQuantity = (productId) => {
        const updatedCartItems = cartItems.map((item) =>
            item._id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        setCartItems(updatedCartItems);
    };

    const decreaseQuantity = (productId) => {
        const updatedCartItems = cartItems.map((item) =>
            item._id === productId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        setCartItems(updatedCartItems);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                increaseQuantity,
                decreaseQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
