import { Link, Outlet } from 'react-router-dom';
import { Fragment, useContext } from 'react';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { ReactComponent as CrownLogo } from '../../assets/crown.svg'

import './navigation.styles.scss'

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
        <div className='navigation'>
          <Link className='logo-container' to='/'>
            <CrownLogo className='logo' />
          </Link>
          <div className='nav-links-container'>
            <Link className='nav-link' to='/shop'>
              SHOP
            </Link>
            { currentUser? (
              <span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>) : (<Link className='nav-link' to='/auth'>
              SIGN IN
            </Link>
            )}
            <CartIcon/>
          </div>
          { isOpen && <CartDropdown /> }
          
        </div>
        <Outlet />
      </Fragment>
    )
}

export default Navigation;