import React from 'react'
import './productDetails.css'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import Foot from './Foot'

function ProductDetails() {
  return (
    <>
    <Nav/>
    <div id='detail'>
      <div className="container">
  {/* Product Image */}
  <div className="product-image">
    <img  alt="Product Image" />
  </div>
  {/* Product Details */}
  <div className="product-details">
    <h1>Product Name</h1>
    <p>
      This is a great product that provides excellent features and value. It is
      built with high-quality materials and offers a variety of functions to
      improve your daily life.
    </p>
    <div className="price">$49.99</div>
    <Link to="/cart"><button className="add-to-cart">Add to Cart</button></Link>
    {/* Product Specifications */}
    <div className="product-specifications">
      <h3>Product Specifications:</h3>
      <ul>
        <li>
          <strong>Color:</strong> Red
        </li>
        <li>
          <strong>Size:</strong> Medium
        </li>
        <li>
          <strong>Material:</strong> Cotton
        </li>
        <li>
          <strong>Brand:</strong> Product Brand
        </li>
        <li>
          <strong>Warranty:</strong> 2 Years
        </li>
      </ul>
    </div>
  </div>
</div>

    </div>
    <Foot/>
    </>
  )
}

export default ProductDetails