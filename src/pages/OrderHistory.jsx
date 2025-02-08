import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderHistory.css';
import Nav from '../components/Nav';
import Foot from '../components/Foot';
import { useNavigate, Link } from 'react-router-dom';

function OrderHistory() {
  const [orders, setOrders] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getAuthToken = () => {
    const token = localStorage.getItem("authToken");
    return token;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const userToken = getAuthToken();

      if (!userToken) {
        setError('Please log in to view your order history');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/orders/orderHistory', {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        if (response.data.success) {
          setOrders(response.data.orderswithItems || []);
        } else {
          setError(response.data.message || 'No orders found');
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError('Error fetching orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Cancel Order Handler
  async function cancelOrder(orderId) {
    const userToken = getAuthToken();
    if (!userToken) {
      setError('Please log in to cancel your order');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/orders/cancelOrder/${orderId}`,
        {},
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      if (response.data.success) {
        // Update the status of the order to "Cancelled" instead of removing it from the list
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: 'Cancelled' } : order
          )
        );
        alert('Order cancelled successfully');
      } else {
        alert(response.data.message || 'Failed to cancel the order');
      }
    } catch (error) {
      console.error('Error canceling the order:', error);
      alert('Error canceling the order');
    }
  }

  return (
    <>
      <Nav />
      <div id="order-history">
        <div className="order-history-container">
          <h2>Order History</h2>

          {loading ? (
            <p>Loading your orders...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <div className="order-list">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order._id} className="order-card">
                    <Link to={`/order/${order._id}`} className="order-link">
                      <h3>Order ID: {order._id}</h3>
                    </Link>
                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p>Status: {order.status}</p>
                    <ul>
                      {order.orderItem.map((item) => (
                        <li key={item.productId._id}>
                          {item.productId.name} x {item.quantity} - ${item.productId.price * item.quantity}
                        </li>
                      ))}
                    </ul>
                    <p><strong>Total: ${order.totalamount ? order.totalamount.toFixed(2) : '0.00'}</strong></p>
                    
                    {/* Conditionally render the cancel button */}
                    {order.status === 'Pending' && (
                      <button onClick={() => cancelOrder(order._id)}>Cancel Order</button>
                    )}
                  </div>
                ))
              ) : (
                <p>You have no past orders.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Foot />
    </>
  );
}

export default OrderHistory;
