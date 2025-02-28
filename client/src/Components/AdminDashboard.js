import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./AdminDashboard.css";
import Sidebar from "./Sidebar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);

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
        <header className="header">
          <h1>Welcome, Admin</h1>
        </header>
        <div className="content">
          <div className="card">
            <h2>Total Users</h2>
            <p>150</p>
          </div>
          <div className="card">
            <h2>Active Users</h2>
            <p>120</p>
          </div>
          <div className="card">
            <h2>Reports</h2>
            <p>5 New Reports</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
