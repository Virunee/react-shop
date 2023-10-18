import { useContext } from "react"
import { CartContext } from "../../contexts/cart.context"

const CheckoutItem = ({cartItem}) => {
    const {imageUrl, name, quantity, price } = cartItem
    const { addItemToCart } = useContext(CartContext)

    return (
        <tr>
            <td><img src={imageUrl} alt={`${name}`}/></td>
            <td><span className="name">{name}</span></td>
            <td>
                <span>&lt;</span>
                    <span className="quantity">{quantity}</span>
                <span onClick={() => addItemToCart(cartItem)}>&gt;</span>
            </td>
            <td><span>{price * quantity}</span></td>
            <td><span>&times;</span></td>
        </tr>
    )
}

export default CheckoutItem