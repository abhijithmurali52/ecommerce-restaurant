import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import './OrderHistory.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faBox, faTags } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar1';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:2024/api/userOrder', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            if (response.data.orders) {
                setOrders(response.data.orders);
              } else {
                setOrders([]);
              }
              setLoading(false);
            } catch (err) {
              setError('Failed to fetch order history. Please try again.');
              setLoading(false);
            }
          };
      
          fetchOrders();
        }, [token]);
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div>
         <Navbar/>
    <div className="order-history">
        
      <h2 className="order-history-title">Order History</h2>
      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="orders">
          {orders.map((order, index) => (
            <div key={index} className="order-card">
              <div className="order-header">
                <h3>Order #{index + 1}</h3>
                <div className="order-date">
                  <FontAwesomeIcon icon={faClock} />
                  <span>{new Date(order.date).toLocaleDateString()}</span>
                </div>
                <div className="order-status">
                  <FontAwesomeIcon icon={faBox} />
                  <span>Status: {order.status}</span>
                </div>
              </div>
              <div className="order-body">
                <p className="order-total">
                  <FontAwesomeIcon icon={faTags} />
                  Total: ${order.total.toFixed(2)}
                </p>
                <h4>Items:</h4>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx} className="order-item">
                      <span>{item.itemName}</span>
                      <span>{item.quantity} x ${item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default OrderHistory;
