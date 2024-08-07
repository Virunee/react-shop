import { Link, Outlet } from 'react-router-dom';
import { Fragment, useContext } from 'react';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { ReactComponent as CrownLogo } from '../../assets/crown.svg'

import {NavigationContainer, LogoContainer, NavLinks, NavLink} from './navigation.styles'

import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context';

import { signOutUser } from '../../utils/firebase/firebase.utils';

const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  const { isOpen, setIsOpen } = useContext(CartContext)

  const signOutHandler = async () => {
    await signOutUser()
  }

    return (
      <Fragment>
        <NavigationContainer>
          <LogoContainer to='/'>
            <CrownLogo className='logo' />
          </LogoContainer>
          <NavLinks>
            <NavLink to='/shop'>
              SHOP
            </NavLink>
            { currentUser? (
              <NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>) : (<NavLink to='/auth'>
              SIGN IN
            </NavLink>
            )}
            <CartIcon/>
          </NavLinks>
          { isOpen && <CartDropdown /> }
          
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
}

export default Navigation;