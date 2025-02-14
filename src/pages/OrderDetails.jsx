import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderDetails.css';
import Nav from '../components/Nav';
import Foot from '../components/Foot';
import { useParams } from 'react-router-dom';

function OrderDetails() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = useParams(); 

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const userToken = localStorage.getItem('authToken');
      if (!userToken) {
        setError('Please log in to view order details');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/orders/getOrder/${orderId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        if (response.data.success) {
          setOrder(response.data.order);
        } else {
          setError(response.data.message || 'Order not found');
        }
      } catch (err) {
        setError('Error fetching order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Nav />
      <div id="order-details">
        <div className="order-details-container">
          <h2>Order Details</h2>

          <div className="order-summary">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Total Amount:</strong> ${order.totalamount?.toFixed(2) || '0.00'}</p>
          </div>

          <h3>Order Items</h3>
          <div className="order-items">
            {order.orderAlongItems && order.orderAlongItems.map((item, index) => (
              <div key={index} className="order-item">
                <img
                  src={`http://localhost:3000/uploads/${item.productId?.image}`}
                  alt={`http://localhost:3000/uploads/${item.productId?.name}`}
                  className="order-item-image"
                />
                <div className="order-item-details">
                  <h4>{item.productId?.name || 'Unknown Product'}</h4>
                  <p>Price: ${item.productId?.price?.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p><strong>Total: ${item.productId?.price * item.quantity}</strong></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Foot />
    </>
  );
}

export default OrderDetails;
