import { useCart } from "../CartContext"

const CartNotifier = () => {
    const { cartItems } = useCart();

    const getQuantity = () => {
        const quantity = cartItems.reduce((acc, current) => {
            return acc + current.quantity;
        }, 0);
        console.log(quantity);
    }
    getQuantity();

    return <p>Items in Cart</p>;
};

export default CartNotifier;

