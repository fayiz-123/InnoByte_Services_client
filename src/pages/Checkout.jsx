import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Checkout.css';
import Nav from '../components/Nav';
import Foot from '../components/Foot';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [shippingAddress, setShippingAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderSummary, setOrderSummary] = useState({
    items: [],
    subtotal: 0,
    shipping: 10.0,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);  
  const navigate = useNavigate();

  const getAuthToken = () => {
    const token = localStorage.getItem("authToken");
    console.log("Auth Token:", token); 
    return token;
  };

  useEffect(() => {
    const fetchCart = async () => {
      const userToken = getAuthToken(); 
      if (!userToken) {
        setError('Please log in to view your cart');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/cart/cart', {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        if (response.data.success) {
          const cartItems = response.data.cart.products || [];
          const userAddress = response.data.address || {};  

          console.log("Fetched Shipping Address:", userAddress); 
          setShippingAddress(userAddress);  

          setOrderSummary((prevSummary) => {
            const subtotal = cartItems.reduce(
              (total, item) => total + item.quantity * item.productId.price,
              0
            );
           
            const total = subtotal + prevSummary.shipping 

            return {
              ...prevSummary,
              items: cartItems,
              subtotal,
              total
            };
          });
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching cart');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);  

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value, 
    }));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shippingAddress || !paymentMethod) {
      alert("Please provide shipping and payment details.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/orders/placeOrder",
        {},
        { headers: { Authorization: `Bearer ${getAuthToken()}` } }
      );

      console.log("Order Response:", response.data);

      if (response.data.success) {
        setOrderPlaced(true); 
        setTimeout(() => {
          navigate('/order-history');
        }, 3000); 
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <>
      <Nav />
      <div id="check">
        <div className="checkout-container">
          <h2>Checkout</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          {loading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <section>
                <h3>Shipping Information</h3>
                <input
                  type="text"
                  name="street"
                  placeholder="Enter your street address"
                  value={shippingAddress.street || ''} 
                  onChange={handleAddressChange}
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="Enter your city"
                  value={shippingAddress.city || ''} 
                  onChange={handleAddressChange}
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="Enter your state"
                  value={shippingAddress.state || ''} 
                  onChange={handleAddressChange}
                  required
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Enter your postal code"
                  value={shippingAddress.postalCode || ''} 
                  onChange={handleAddressChange}
                  required
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Enter your country"
                  value={shippingAddress.country || ''} 
                  onChange={handleAddressChange}
                  required
                />
              </section>

              <section>
                <h3>Payment Information</h3>
                <select value={paymentMethod} onChange={handlePaymentChange} required>
                  <option value="">Select Payment Method</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                </select>
              </section>

              <section>
                <h3>Order Summary</h3>
                <ul>
                  {orderSummary.items.map((item) => (
                    <li key={item.productId._id}>
                      {item.productId.name} x {item.quantity} - ${item.productId.price * item.quantity}
                    </li>
                  ))}
                </ul>
                <p>Subtotal: ${orderSummary.subtotal.toFixed(2)}</p>
                <p>Shipping: ${orderSummary.shipping.toFixed(2)}</p>
                <p><strong>Total: ${orderSummary.total.toFixed(2)}</strong></p>
              </section>

              <button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Complete Order"}
              </button>
            </form>
          )}

          <div className={`order-complete-message ${orderPlaced ? 'show' : ''}`}>
            Order placed successfully!
          </div>

        </div>
      </div>
      <Foot />
    </>
  );
}

export default Checkout;
