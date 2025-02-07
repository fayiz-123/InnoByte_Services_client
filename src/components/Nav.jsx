import React from 'react'
import './Nav.css'
import {Link} from 'react-router-dom'

function Nav() {
  return (
    <div id='nav'>
        <nav className="navbar">
  <div className="logo">ShopEasy</div>
  <ul className="nav-links">
    <li>
      <Link to='/'>Home</Link>
    </li>
    <li>
      <a href="#">Shop</a>
    </li>
    <li>
      <a href="#">About</a>
    </li>
    <li>
    <Link to='/login'>Login</Link>
    </li>
  </ul>
  <div className="cart">
    <Link to='/cart'>🛒 Cart</Link>
  </div>
</nav>

    </div>
  )
}

export default Nav