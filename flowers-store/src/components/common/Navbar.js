import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const Navbar = (props) => {
  const {loggedIn, isAdmin, logout} = props

  return (
    <header>
      <nav className='navbar-menu'>
              <Link className='navbar-brand' to='/'>Flowershouse</Link>
              <NavLink className='nav-link' activeClassName='active' exact to='/'>Home</NavLink>
              <NavLink className='nav-link' to='/store'>Store</NavLink>
              {loggedIn && !isAdmin && <NavLink className='nav-link' to='/orders'>My Orders</NavLink>}
              {isAdmin && <NavLink className='nav-link' to='/admin/create'>Create New Offer</NavLink>}
              {isAdmin && <NavLink className='nav-link' to='/admin/orders/pending'>Pending Orders</NavLink>}
              {loggedIn && !isAdmin && <NavLink className='nav-link' to='/cart'>Cart</NavLink>}
              {loggedIn && <a className='nav-link' href='javascript:void(0)' onClick={logout}>Logout</a>}
              {!loggedIn && <NavLink className='nav-link' to='/login'>Login</NavLink>}
              {!loggedIn && <NavLink className='nav-link' to='/register'>Register</NavLink>}
      </nav>
    </header>
  )
}

export default Navbar