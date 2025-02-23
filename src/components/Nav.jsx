import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./Nav.css";

function Nav() {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const userId = decoded.userID;

        const response = await axios.get(`http://localhost:3000/user/${userId}`);
        if (response.data.success) {
          setUserName(response.data.user.username);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserName();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token
    setUserName(null);  // Reset username state
    navigate("/login"); // Redirect to login page
  };

  return (
    <div id="nav">
      <nav className="navbar">
        <div className="logo">ShopEazY</div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>  {/* Profile button replaces Shop */}
          </li>
          <li>
            <Link to="/order-history">Orders</Link>
          </li>
          <li>
            <div className="cart">
              <Link to="/wishlist">WishList ❤️</Link>
            </div>
          </li>
          <li>
            <div className="cart">
              <Link to="/cart">🛒 Cart</Link>
            </div>
          </li>
        </ul>
        <div className="right-section">
          {userName ? (
            <div className="user-section">
              <span className="username">{userName}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <ul className="nav-links"><li> <Link to="/login" className="login-btn">Login</Link></li></ul>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Nav;
