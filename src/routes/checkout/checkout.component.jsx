import { useContext } from 'react'
import {CartContext} from '../../contexts/cart.context'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'

import './checkout.styles.scss'

const Checkout = () => {
    const { cartItems } = useContext(CartContext)

    return(
        <div className="checkout-container">
            <table>
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Remove</th>
                </tr>
                </thead>
                <tbody>
            {cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
            )}
            </tbody>
            </table>
        </div>
    )
}

export default Checkout;