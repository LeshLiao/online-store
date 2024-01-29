import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountIcon from '@mui/icons-material/AccountCircleRounded';
import CartIcon from '@mui/icons-material/ShoppingCartRounded';

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMoMenu = () => setClick(false);
  const scrollToTop = () => { window.scroll(0, 0) };

  return (
    <>
      <nav className='navbar'>
        <div className='left-container' onClick={handleClick}>
          <div className='menu-icon'>
              <MenuRoundedIcon fontSize='medium'/>
              <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
        </div>
        <div className='center-container'>
          {/* Mobile */}
          <Link to='/' className='navbar-mobile-logo' onClick={() => { closeMoMenu(); scrollToTop(); }}>PaletteX</Link>
          {/* Desktop */}
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'><Link to='/new' className='nav-links' onClick={closeMoMenu}>New In</Link></li>
            <li className='nav-item'><Link to='/digital' className='nav-links' onClick={closeMoMenu}>Digital</Link></li>
            <li className='nav-item'><Link to='/gallery' className='nav-links' onClick={closeMoMenu}>Gallery</Link></li>
            {/* <Link to='/' className='navbar-desktop-logo' onClick={() => {this.forceUpdate()}}>PaletteX</Link> */}
            <Link to='/' className='navbar-desktop-logo' onClick={() => {closeMoMenu(); scrollToTop();}}>PaletteX</Link>
            <li className='nav-item'><Link to='/prints' className='nav-links' onClick={closeMoMenu}>Prints</Link></li>
            <li className='nav-item'><Link to='/frames' className='nav-links' onClick={closeMoMenu}>Frames</Link></li>
            <li className='nav-item'><Link to='/about'className='nav-links' onClick={closeMoMenu}>About</Link></li>
            <li className='account-icon-mobile'>
              <Link to='/account' className='account-icon-mobile-link' onClick={closeMoMenu}><AccountIcon /></Link>
            </li>
          </ul>
        </div>
        <div className='right-container'>
          <Link to='/account' className='account-icon-desktop' onClick={closeMoMenu}><AccountIcon /></Link>
          <Link to='/cart' className='cart-icon' onClick={closeMoMenu}><CartIcon /></Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;