import React from 'react';

import './navbar.scss'
import HeaderDefault from '../../atoms/Header'
import HorizontalMenu from '../menus/HorizontalMenu'

const Navbar = () => {
  return(
    <div className="navbar">
      <div className="navbar-title">
        <HeaderDefault size={'large'}>
          SalesForce Scheduler
        </HeaderDefault>
      </div>
      <div className="navbar-menu">
        <HorizontalMenu/>
      </div>
    </div>
  )
}

export default Navbar