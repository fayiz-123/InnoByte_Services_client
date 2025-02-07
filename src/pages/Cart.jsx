import React from 'react'
import { Link } from 'react-router-dom'
import './Cart.css'

function Cart() {
  return (
    <body id='main-body'>
    <div id='hello'>
        <div className="cart-container">
  <h2>Your Shopping Cart</h2>
  <div className="cart-items">
    <div className="cart-item">
      <img src="https://via.placeholder.com/100" alt="Product 1" />
      <div className="item-details">
        <h3>Product 1</h3>
        <p>$25.99</p>
        <div className="quantity">
          <label htmlFor="quantity-1">Quantity:</label>
          <input
            type="number"
            id="quantity-1"
            name="quantity"
            defaultValue={1}
            min={1}
          />
        </div>
      </div>
      <button className="remove-btn">Remove</button>
    </div>
    <div className="cart-item">
      <img src="https://via.placeholder.com/100" alt="Product 2" />
      <div className="item-details">
        <h3>Product 2</h3>
        <p>$39.99</p>
        <div className="quantity">
          <label htmlFor="quantity-2">Quantity:</label>
          <input
            type="number"
            id="quantity-2"
            name="quantity"
            defaultValue={1}
            min={1}
          />
        </div>
      </div>
      <button className="remove-btn">Remove</button>
    </div>
  </div>
  <div className="cart-summary">
    <h3>Cart Summary</h3>
    <p>
      <strong>Total Items:</strong> 2
    </p>
    <p>
      <strong>Total Price:</strong> $65.98
    </p>
   <Link to='/checkout'> <button className="checkout-btn">Proceed to Checkout</button></Link>
  </div>
</div>

    </div>
    </body>
  )
}

export default Cart