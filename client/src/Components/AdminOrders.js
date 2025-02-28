import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import "./AdminOrders.css";
import Swal from 'sweetalert2';
import { confirmAlert } from 'react-confirm-alert'; // Import confirmAlert
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:2024/api/order");
      setOrders(response.data);
    } catch (error) {
      setError(error);
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
    const intervalId = setInterval(fetchOrders, 5000); // Fetch orders every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);
  
  
  
  // Update the status of a specific order
//   const handleStatusChange = async (userId, orderId, newStatus) => {
//     const result = await Swal.fire({
//         title: 'Are you sure?',
//         text: `Do you want to change the status to ${newStatus}?`,
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, change it!',
//       });
//       if (result.isConfirmed) {
//       try {
//         const response = await axios.patch(
//           `http://localhost:2024/api/order/status/${userId}/${orderId}`,
//           { status: newStatus }
//         );
//         console.log(response.data.message); // Optionally show success message
//       } catch (error) {
//         console.error("Error updating status:", error.response.data.message); // Optionally show error message
//       }
//     }
//   };
const handleStatusChange = async (userId, orderId, newStatus) => {
    confirmAlert({
      title: 'Confirm Status Change',
      message: `Are you sure you want to change the status to ${newStatus}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.patch(`http://localhost:2024/api/order/status/${userId}/${orderId}`, { status: newStatus });
              toast.success('Order status updated successfully', { autoClose: 2000 });
              // Refresh or update the UI as needed
            } catch (error) {
              console.error('Error updating status:', error);
              toast.error('Failed to update order status', { autoClose: 2000 });
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  const handlePrintOrder = (orderDetail) => {
    const printWindow = window.open('', '', 'width=800,height=1000');
    printWindow.document.write(`
      <html>
      <head>
        <title>Print Order</title>
        <style>
          @media print {
            body {
              font-family: 'Courier New', Courier, monospace;
              width: 58mm;
              margin: 0;
              padding: 0;
            }
            .receipt {
              padding: 10px;
            }
            .receipt-header, .receipt-footer {
              text-align: center;
            }
            .receipt-items, .total {
              margin-top: 10px;
            }
            .item-row {
              display: flex;
              justify-content: space-between;
            }
            /* Hide the Chrome-generated text */
            @page {
              margin: 0;
            }
            body::before {
              content: none;
            }
            body::after {
              content: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="receipt-header">
            <h2>Ashraf's Restaurant</h2>
            <p>Address Line 1</p>
            <p>Address Line 2</p>
            <p>Phone: 123-456-7890</p>
          </div>
          <div class="receipt-details">
            <p><strong>Order ID:</strong> ${orderDetail._id}</p>
            <p><strong>Date:</strong> ${new Date(orderDetail.date).toLocaleString()}</p>
            <p><strong>Status:</strong> ${orderDetail.status}</p>
          </div>
          <div class="receipt-items">
            ${orderDetail.items.map(item => `
              <div class="item-row">
                <span>${item.itemName}</span>
                <span>${item.quantity} x $${item.price.toFixed(2)}</span>
              </div>
            `).join('')}
          </div>
          <div class="total">
            <div class="item-row">
              <span><strong>Total:</strong></span>
              <span><strong>$${orderDetail.total.toFixed(2)}</strong></span>
            </div>
          </div>
          <div class="receipt-footer">
            <p>Thank you for your order!</p>
          </div>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching orders: {error.message}</p>;
  }
  return (
    <div className="dashboard-container">
    <Sidebar show={sidebarOpen} onHide={handleSidebarToggle} />
    <div
      className={`sidebar-toggle ${sidebarOpen ? "open" : "closed"}`}
      onClick={handleSidebarToggle}
    >
      {sidebarOpen ? <FaArrowLeft /> : <FaArrowRight />}
    </div>
    <div
      className={`main-content ${
        sidebarOpen ? "with-sidebar" : "without-sidebar"
      }`}
    >
      <h1 className="heading">Orders</h1>
      {orders && orders.length > 0 ? (
        orders.map((userOrder, userOrderIndex) => (
          <div key={userOrderIndex} className="user-order">
            <div className="user-info">
              <h2 className="orderTitle">User Orders</h2>
              <div className="userDetails">
                <p>
                  <strong>User ID:</strong> {userOrder.user.userId}
                </p>
                <p>
                  <strong>Username:</strong> {userOrder.user.username}
                </p>
                <p>
                  <strong>Mobile Number:</strong> {userOrder.user.mobileNo}
                </p>
                <p>
                  <strong>Address:</strong> {userOrder.user.address}
                </p>
                <p>
                  <strong>Email:</strong> {userOrder.user.email}
                </p>
              </div>
            </div>
            <div className="orders-container">
              {userOrder.orders && userOrder.orders.length > 0 ? (
                userOrder.orders.map((orderDetail, orderDetailIndex) => (
                  <div key={orderDetailIndex} className="order" id={`order-${orderDetail._id}`}>
                    <div className="order-header">
                      <h3 className="orderDetailTitle">
                        Order {orderDetailIndex + 1}
                      </h3>
                      <button className="print-button" onClick={() => handlePrintOrder(orderDetail)}>
                        <FontAwesomeIcon icon={faPrint} className="print-button-icon" />
                        Print Order
                      </button>
                    </div>
                    <div className="order-details">
                      <div className="orderTable">
                        <div className="tableRow header">
                          <div className="tableCell">Total Amount</div>
                          <div className="tableCell">Order Date</div>
                          <div className="tableCell">Status</div>
                        </div>
                        <div className="tableRow">
                          <div className="tableCell">
                            ${orderDetail.total.toFixed(2)}
                          </div>
                          <div className="tableCell">
                            {new Date(orderDetail.date).toLocaleString()}
                          </div>
                          <div className="tableCell text-center">
                            <select
                              value={orderDetail.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  userOrder._id,
                                  orderDetail._id,
                                  e.target.value
                                )
                              }
                            >
                              <option value="Pending">Pending</option>
                              <option value="Completed">Completed</option>
                              <option value="Canceled">Canceled</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="orderItems">
                        <h4 className="orderItemsTitle">Items</h4>
                        <div className="itemsContainer">
                          <div className="tableRow header">
                            <div className="tableCell">Item</div>
                            <div className="tableCell">Price</div>
                            <div className="tableCell">Quantity</div>
                          </div>
                          {orderDetail.items && orderDetail.items.length > 0 ? (
                            orderDetail.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="tableRow">
                                <div className="tableCell">{item.itemName}</div>
                                <div className="tableCell">
                                  ${item.price.toFixed(2)}
                                </div>
                                <div className="tableCell">{item.quantity}</div>
                              </div>
                            ))
                          ) : (
                            <p>No items found.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No orders found.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
    <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
  </div>
  
  
  );
};

export default AdminOrders;
