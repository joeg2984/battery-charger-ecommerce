import { useCart } from '../CartContext'

const AddToCartBtn = ({ productId }) => {
    const { addToCart } = useCart();

    return (
<button type="button" onClick={handleClick}> 
Add to Cart 
</button>
)
}

export default AddToCartBtn