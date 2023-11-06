import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaTimes } from 'react-icons/fa'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import styles from './header.module.scss'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "")

const logo = (
  <div className={styles.logo}>
    <NavLink to='/'>
      <h2>
        d<span>Shop</span>.
      </h2>
    </NavLink>
  </div>
)

const cart = (
  <span className={styles.cart}>
    <NavLink to='/cart' className={activeLink}>
      Cart
      <FaShoppingCart size={20} />
      <p>0</p>
    </NavLink>
  </span>
)

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }
  const hideMenu = () => {
    setShowMenu(false)
  }

  const logoutUser = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      toast.success('Logout successfully...')
      navigate('/')
    }).catch((error) => {
      // An error happened.
      toast.error(error.message)
    });
  }

  return (
    <header>
      <div className={styles.header}>
        {logo}
        <nav className={showMenu ? `${styles['show-nav']}` : `${styles['hide-nav']}`}>
          <div className={showMenu ? `${styles['nav-wrapper']} ${styles['show-nav-wrapper']}` : `${styles['nav-wrapper']}`} onClick={hideMenu} />
          <ul onClick={hideMenu}>
            <li className={styles['logo-mobile']}>
              {logo}
              <FaTimes size={22} color='#fff' onClick={hideMenu} />
            </li>
            <li>
              <NavLink to='/' className={activeLink}>Home</NavLink>
            </li>
            <li>
              <NavLink to='/contact' className={activeLink}>Contact Us</NavLink>
            </li>
          </ul>
          <div className={styles['header-right']} onClick={hideMenu}>
            <span className={styles.links}>
              <NavLink to='login' className={activeLink}>Login</NavLink>
              <NavLink to='register' className={activeLink}>Register</NavLink>
              <NavLink to='order-history' className={activeLink}>My Orders</NavLink>
              <NavLink to='/' onClick={logoutUser}>Logout</NavLink>
            </span>
            {cart}
          </div>
        </nav>

        <div className={styles['menu-icon']}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  )
}

export default Header