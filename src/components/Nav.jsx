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

  // 🚀 Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token
    setUserName(null);  // Reset username state
    navigate("/login"); // Redirect to login page
  };

  return (
    <div id="nav">
      <nav className="navbar">
        <div className="logo">ShopEasy</div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="#">Shop</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            {userName ? (
              <div className="user-container">
                <Link to="/profile" className="username">{userName}</Link>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
        <div className="cart">
          <Link to="/cart">🛒 Cart</Link>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
