import { createContext, useContext, useState } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
        const [cartItems, setCartItems] = useState([]);
    
        const addToCart = (product) => {
            const existingItem = cartItems.find(item => item.product.id === product.id);
            console.log("EXISTING ITEM??", existingItem);
            
            setCartItems(prevItems => {
                if (existingItem) {
                    return cartItems.map((item) =>
                        item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                    );
                } else {
                    return [
                        ...cartItems,
                        {
                        product: product,
                        quantity: 1,
                        }
                    ];
                }
            });
        };
    
        const emptyCart = () => {
            setCartItems([]);
        };
    
        return (
            <CartContext.Provider value={{ cartItems, addToCart, emptyCart }}>
                {children}
            </CartContext.Provider>
        );
    }


export default CartProvider;

export const useCart = () => useContext(CartContext);
