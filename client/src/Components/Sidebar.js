// Sidebar.js
import React from "react";
import { Offcanvas, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom"; // If you are using react-router

const Sidebar = ({ show, onHide }) => {
  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="start"
      style={{
        width: show ? "250px" : "0", // Adjust width based on show state
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "#f8f9fa",
        borderRight: "1px solid #ddd",
        overflowX: "hidden", // Hide overflow on x-axis
        transition: "width 0.3s", // Smooth transition
      }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="text-center">Admin Dashboard</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup style={{ width: "100%" }}>
          <ListGroup.Item
            as={Link}
            to="/admindashboard"
            onClick={onHide}
            style={{
              width: "100%",
              border: "none",
              borderBottom: "1px solid #ddd", // Optional: Add a bottom border for separation
              padding: "15px",
              backgroundColor: "#f8f9fa",
              transition: "background-color 0.3s",
            }}
          >
            Overview
          </ListGroup.Item>
          <ListGroup.Item
            as={Link}
            to="/users"
            onClick={onHide}
            style={{
              width: "100%",
              border: "none",
              borderBottom: "1px solid #ddd", // Optional: Add a bottom border for separation
              padding: "15px",
              backgroundColor: "#f8f9fa",
              transition: "background-color 0.3s",
            }}
          >
            Users
          </ListGroup.Item>
          <ListGroup.Item
            as={Link}
            to="/items"
            onClick={onHide}
            style={{
              width: "100%",
              border: "none",
              borderBottom: "1px solid #ddd", // Optional: Add a bottom border for separation
              padding: "15px",
              backgroundColor: "#f8f9fa",
              transition: "background-color 0.3s",
            }}
          >
            Items
          </ListGroup.Item>
          <ListGroup.Item
            as={Link}
            to="/admintablelist"
            onClick={onHide}
            style={{
              width: "100%",
              border: "none",
              borderBottom: "1px solid #ddd", // Optional: Add a bottom border for separation
              padding: "15px",
              backgroundColor: "#f8f9fa",
              transition: "background-color 0.3s",
            }}
          >
            Table Reservations
          </ListGroup.Item>
          <ListGroup.Item
            as={Link}
            to="/orders"
            onClick={onHide}
            style={{
              width: "100%",
              border: "none",
              borderBottom: "1px solid #ddd", // Optional: Add a bottom border for separation
              padding: "15px",
              backgroundColor: "#f8f9fa",
              transition: "background-color 0.3s",
            }}
          >
            Orders
          </ListGroup.Item>
          <ListGroup.Item
            as={Link}
            to="/admin-order-history"
            onClick={onHide}
            style={{
              width: "100%",
              border: "none",
              borderBottom: "1px solid #ddd", // Optional: Add a bottom border for separation
              padding: "15px",
              backgroundColor: "#f8f9fa",
              transition: "background-color 0.3s",
            }}
          >
            Order History
          </ListGroup.Item>
          <ListGroup.Item
            as={Link}
            to="/menu"
            onClick={onHide}
            style={{
              width: "100%",
              border: "none",
              borderBottom: "1px solid #ddd", // Optional: Add a bottom border for separation
              padding: "15px",
              backgroundColor: "#f8f9fa",
              transition: "background-color 0.3s",
            }}
          >
            Menu
          </ListGroup.Item>
          <ListGroup.Item
            as={Link}
            to="/reports"
            onClick={onHide}
            style={{
              width: "100%",
              border: "none",
              borderBottom: "1px solid #ddd", // Optional: Add a bottom border for separation
              padding: "15px",
              backgroundColor: "#f8f9fa",
              transition: "background-color 0.3s",
            }}
          >
            Reports
          </ListGroup.Item>
          <ListGroup.Item
            onClick={onHide}
            style={{
              width: "100%",
              border: "none",
              borderBottom: "1px solid #ddd", // Optional: Add a bottom border for separation
              padding: "15px",
              backgroundColor: "#f8f9fa",
              transition: "background-color 0.3s",
            }}
          >
            Logout
          </ListGroup.Item>
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;
