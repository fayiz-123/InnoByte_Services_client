import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css"; 

const AdminDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
  };

  return (
    <div className="admin-dashboard-container">
      <h2>Welcome Admin</h2>
      <div className="admin-actions">
        <Link to="/adminProducts">Manage Products</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
