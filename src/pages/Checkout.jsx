import React, { useState } from 'react';
import './Checkout.css'

function Checkout() {
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderSummary, setOrderSummary] = useState({
    items: [
      { id: 1, name: 'Product 1', price: 29.99, quantity: 1 },
      { id: 2, name: 'Product 2', price: 49.99, quantity: 2 },
    ],
    subtotal: 129.97, // calculated subtotal
    shipping: 10.0,   // shipping cost
    tax: 8.5,         // tax amount
    total: 148.47     // total amount (subtotal + shipping + tax)
  });

  const handleShippingChange = (e) => {
    setShippingAddress(e.target.value);
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order Submitted!');
    // In a real application, you would send the order data to the backend here
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <section>
          <h3>Shipping Information</h3>
          <input
            type="text"
            placeholder="Enter your shipping address"
            value={shippingAddress}
            onChange={handleShippingChange}
            required
          />
        </section>

        <section>
          <h3>Payment Information</h3>
          <input
            type="text"
            placeholder="Enter payment method (e.g., credit card)"
            value={paymentMethod}
            onChange={handlePaymentChange}
            required
          />
        </section>

        <section>
          <h3>Order Summary</h3>
          <ul>
            {orderSummary.items.map(item => (
              <li key={item.id}>
                {item.name} x {item.quantity} - ${item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p>Subtotal: ${orderSummary.subtotal.toFixed(2)}</p>
          <p>Shipping: ${orderSummary.shipping.toFixed(2)}</p>
          <p>Tax: ${orderSummary.tax.toFixed(2)}</p>
          <p>Total: ${orderSummary.total.toFixed(2)}</p>
        </section>

        <button type="submit">Complete Order</button>
      </form>
    </div>
  );
}

export default Checkout;
