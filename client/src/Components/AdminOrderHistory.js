import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import {
  Table,
  Container,
  Button,
  Spinner,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import "./AdminOrderHistory.css";

const AdminOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2024/api/orderHistory"
        ); // Adjust the URL as needed
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders", { autoClose: 2000 });
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const flattenOrders = (orders) => {
    // Flatten orders and include user details with each order
    return orders.flatMap((user) =>
      user.orders.map((order) => ({
        userId: user.user.userId,
        username: user.user.username,
        email: user.user.email,
        address: user.user.address,
        ...order,
      }))
    );
  };

  const sortedOrders = flattenOrders(orders).sort((a, b) => new Date(b.date) - new Date(a.date));

  const filterOrders = (orders) => {
    return orders.filter((order) => {
      const matchesSearchTerm =
        order.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some((item) =>
          item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return matchesSearchTerm;
    });
  };

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
        <div className="order-history-container">
          <h1 className="heading">Order History</h1>
          <div className="filter-container">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <Table
            striped
            bordered
            hover
            responsive
            className="order-history-table"
          >
            <thead>
              <tr>
                {/* <th>User ID</th> */}
                <th>Sl No</th>
                <th>Username</th>
                <th>Email</th>
                <th>Address</th>
                <th>Order Date</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
          {filterOrders(sortedOrders).map((order, index) => (
            <tr key={index}>
              <td>{index + 1}</td> {/* Index Number */}
              {/* <td>{order.userId}</td> */}
              <td>{order.username}</td>
              <td>{order.email}</td>
              <td>{order.address}</td>
              <td>{new Date(order.date).toLocaleString()}</td>
              <td>${order.total.toFixed(2)}</td>
              <td>{order.status}</td>
              <td>
                {order.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="item-detail">
                    {item.itemName} (x{item.quantity}) - ${item.price.toFixed(2)}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
          </Table>
        </div>
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      </div>
    </div>
  );
};

export default AdminOrderHistory;
