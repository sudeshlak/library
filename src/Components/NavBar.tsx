import React from 'react';
import {Link} from "react-router-dom";

const NavBar: React.FC = () => {
  return (
      <nav className='navbar navbar-expand-lg navbar-light shadow-sm'>
        <ul className='navbar-nav'>
          <li className='nav-item'><Link className='nav-link' to={'/'}>Home</Link></li>
          <li className='nav-item'><Link className='nav-link' to={'/about'}>About</Link></li>
          <li className='nav-item'><Link className='nav-link' to={'/contact'}>Contact</Link></li>
        </ul>
      </nav>
  );
}

export default NavBar;