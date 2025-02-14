import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from '../components/Nav'
import Foot from '../components/Foot'
import './Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const userToken = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchCart = async () => {
      if (!userToken) {
        setError('Please log in to view your cart');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/cart/cart', {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        setCartItems(response.data.cart.products || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching cart');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userToken]);

  const handleQuantityChange = async (productId, action) => {
    if (isProcessing) return;
    setIsProcessing(true);

    const updatedCartItems = cartItems.map((item) => {
      if (item.productId._id === productId) {
        if (action === 'increment') {
          item.quantity += 1;
        } else if (action === 'decrement') {
          item.quantity -= 1;
          if (item.quantity <= 0) {
            item.quantity = 0; 
          }
        }
      }
      return item;
    });

    setCartItems(updatedCartItems);

    try {
      const response = await axios.put(
        'http://localhost:3000/cart/updateCart',
        { productId, action },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      if (!response.data.success) {
        setError(response.data.message || 'Error updating cart');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating cart');
    } finally {
      setIsProcessing(false); 
    }
  };

  const handleRemoveItem = async (productId) => {
    if (isProcessing) return; 
    setIsProcessing(true);

    try {
        const response = await axios.delete(
            'http://localhost:3000/cart/deleteCart',
            { 
                headers: { Authorization: `Bearer ${userToken}` },
                data: { productId }
            }
        );

        if (response.data.success) {
            setCartItems((prevItems) =>
                prevItems.filter((item) => item.productId._id !== productId)
            );
        } else {
            setError(response.data.message || 'Error removing product');
        }
    } catch (err) {
        setError(err.response?.data?.message || 'Error removing product');
    } finally {
        setIsProcessing(false);
    }
};

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * (item.productId?.price || 0),
    0
  );

  const isCartEmpty = cartItems.length === 0;

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <Nav/>
    <div id="cart">
      <div className="cart-container">
        <h2>Your Shopping Cart</h2>
        {isCartEmpty ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div className="cart-item" key={item.productId?._id || index}>
                <img
                  src={`http://localhost:3000/uploads/${item.productId?.image}`} 
                  alt={`http://localhost:3000/uploads/${item.productId?.name}`}
                />
                <div className="item-details">
                  <h3>{item.productId?.name || 'Unknown Product'}</h3>
                  <p>${item.productId?.price?.toFixed(2) || '0.00'}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleQuantityChange(item.productId._id, 'decrement')}
                      disabled={isProcessing || item.quantity === 0} 
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleQuantityChange(item.productId._id, 'increment')}
                      disabled={isProcessing} 
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.productId._id)} 
                      disabled={isProcessing} 
                      className="remove-item-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="cart-summary">
          <h3>Cart Summary</h3>
          <p><strong>Total Items:</strong> {cartItems.length}</p>
          <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
          {isCartEmpty ? (
            <Link to="/">
              <button className="checkout-btn">Shop Now</button>
            </Link>
          ) : (
            <Link to="/checkout">
              <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
          )}
        </div>
      </div>
    </div>
    <Foot/>
    </>
  );
}

export default Cart;
