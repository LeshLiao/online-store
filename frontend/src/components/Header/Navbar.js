import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import './Navbar.css'
import classes from './navbar.module.css'
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
      document.body.classList.add('fixed_position')
    } else {
      document.body.classList.remove('fixed_position')
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
      <nav className={classes.navbar} id="navbar">
        <div className={classes.left_container} onClick={handleClick}>
          <div className={classes.menu_icon}>
              <MenuRoundedIcon fontSize='medium'/>
              {/* <i className={click ? 'fas fa-times' : 'fas fa-bars'} /> */}
              <i className={click ? classes.times : classes.bars} /> {/* Use module CSS classes */}
          </div>
          <div></div>
        </div>
        <div className={classes.center_container}>
          {/* Mobile */}
          <Link to='/' className={classes.navbar_mobile_logo} onClick={() => { closeMoMenu(); scrollToTop() }}>PaletteX</Link>
          {/* Desktop */}
          {/* <ul className={click ? 'nav-menu active' : 'nav-menu'}> */}
          <ul className={click ? `${classes.nav_menu} ${classes.active}` : classes.nav_menu}>
            <li className={classes.nav_item}><Link to='/painting' className={classes.nav_links} onClick={closeMoMenu}>PAINTING</Link></li>
            <li className={classes.nav_item}><Link to='/landscape' className={classes.nav_links} onClick={closeMoMenu}>LANDSCAPE</Link></li>
            {/* <li className='nav-item'><Link to='/gallery' className='nav-links' onClick={closeMoMenu}>Gallery</Link></li> */}
            <Link to='/' className={classes.navbar_desktop_logo} onClick={() => { closeMoMenu(); scrollToTop() }}>PaletteX</Link>
            <li className={classes.nav_item}><Link to='/city' className={classes.nav_links} onClick={closeMoMenu}>CITY VIEWS</Link></li>
            <li className={classes.nav_item}><Link to='/help' className={classes.nav_links} onClick={closeMoMenu}>HELP CENTER</Link></li>
            {/* <li className='nav-item'><Link to='/about'className='nav-links' onClick={closeMoMenu}>About</Link></li> */}
            <li className={classes.account_icon_mobile}>
                <Link to='/account' className={classes.account_icon_mobile_link} onClick={closeMoMenu}><AccountIcon /></Link>
            </li>
          </ul>
        </div>
        <div className={classes.right_container}>
          <div className={classes.login_container}>
            <Link to='/account' className={classes.account_icon_desktop} onClick={closeMoMenu}><AccountIcon /></Link>
          </div>
          <Link to='/cart/view' className={classes.cart_icon} onClick={closeMoMenu}><CartIcon /></Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar
