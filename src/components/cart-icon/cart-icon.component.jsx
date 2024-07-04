import { useContext } from 'react'

import { CartContext } from '../../contexts/cart.context'

import {CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles.jsx'

const CartIcon = () => {
    const { isOpen, setIsOpen, cartCount } = useContext(CartContext)

    const toggleCartOpen = () => {
        setIsOpen(!isOpen)
      }

return (
    <CartIconContainer onClick={toggleCartOpen}>
        <ShoppingIcon/>
        <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
)
}

export default CartIcon;