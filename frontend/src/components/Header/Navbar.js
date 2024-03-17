import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import AccountIcon from '@mui/icons-material/AccountCircleRounded'
import CartIcon from '@mui/icons-material/ShoppingCartRounded'
// import ExitToAppIcon from '@mui/icons-material/ExitToApp'
// import FaceIcon from '@mui/icons-material/Face'
// import { useAuth } from '../../hooks/useAuth'

function Navbar () {
  const [click, setClick] = useState(false)
  const closeMoMenu = () => setClick(false)
  const scrollToTop = () => { window.scroll(0, 0) }
  // const { user } = useAuth()

  useEffect(() => {
    if (click) {
      document.body.classList.add('fixed-position')
    } else {
      document.body.classList.remove('fixed-position')
    }
  }, [click])

  const handleClick = () => {
    setClick(!click)
  }

  /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
  let prevScroll = window.scrollY
  window.onscroll = function () {
    const currentScrollPos = window.scrollY
    if (prevScroll > currentScrollPos || window.scrollY < 100) {
      document.getElementById('navbar').style.top = '0'
    } else {
      document.getElementById('navbar').style.top = '-50px'
    }
    prevScroll = currentScrollPos
  }

  return (
    <>
      {/* <div className='top_container' id="top_container"></div> */}
      <nav className='navbar' id="navbar">
        <div className='left-container' onClick={handleClick}>
          <div className='menu-icon'>
              <MenuRoundedIcon fontSize='medium'/>
              <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <div></div>
        </div>
        <div className='center-container'>
          {/* Mobile */}
          <Link to='/' className='navbar-mobile-logo' onClick={() => { closeMoMenu(); scrollToTop() }}>PaletteX</Link>
          {/* Desktop */}
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {/* <li className='nav-item'><Link to='/new' className='nav-links' onClick={closeMoMenu}>New In</Link></li> */}
            <li className='nav-item'><Link to='/landscape' className='nav-links' onClick={closeMoMenu}>LANDSCAPE</Link></li>
            {/* <li className='nav-item'><Link to='/gallery' className='nav-links' onClick={closeMoMenu}>Gallery</Link></li> */}
            <Link to='/' className='navbar-desktop-logo' onClick={() => { closeMoMenu(); scrollToTop() }}>PaletteX</Link>
            <li className='nav-item'><Link to='/city' className='nav-links' onClick={closeMoMenu}>CITY VIEWS</Link></li>
            {/* <li className='nav-item'><Link to='/frames' className='nav-links' onClick={closeMoMenu}>Frames</Link></li> */}
            {/* <li className='nav-item'><Link to='/about'className='nav-links' onClick={closeMoMenu}>About</Link></li> */}
            <li className='account-icon-mobile'>
                <Link to='/account' className='account-icon-mobile-link' onClick={closeMoMenu}><AccountIcon /></Link>
            </li>
          </ul>
        </div>
        <div className='right-container'>
          <div className='login_container'>
            <Link to='/account' className='account-icon-desktop' onClick={closeMoMenu}><AccountIcon /></Link>
          </div>
          <Link to='/cart/view' className='cart-icon' onClick={closeMoMenu}><CartIcon /></Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar
