import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import Foot from "../components/Foot";
import { Link } from "react-router-dom";
import "./wishlist.css";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Please log in to view your wishlist.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:3000/wishlist/getWishList", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setWishlist(response.data.getWishList.products);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError("Failed to load wishlist.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Please log in to remove items from your wishlist.");
        return;
      }

      const response = await axios.put(
        "http://localhost:3000/wishlist/removeFromWishList",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setWishlist((prevWishlist) => prevWishlist.filter((item) => item.productId._id !== productId));
        alert("Item removed from wishlist.");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Failed to remove item from wishlist.");
      console.error(error);
    }
  };

  return (
    <>
      <Nav />
      <div id="wishlist-section">
        <h2 id="wishlist-title">My Wishlist</h2>
        {loading ? (
          <p id="wishlist-loading">Loading wishlist...</p>
        ) : error ? (
          <p id="wishlist-error">{error}</p>
        ) : wishlist.length === 0 ? (
          <p id="wishlist-empty">Your wishlist is empty.</p>
        ) : (
          <div id="wishlist-container">
            {wishlist.map((item) => (
              <div key={item.productId._id} className="wishlist-card">
                <Link to={`/product/${item.productId._id}`}>
                  <img src={`http://localhost:3000/uploads/${item.productId.image}`} alt={item.productId.name} className="wishlist-image" />
                </Link>
                <div className="wishlist-info">
                  <h3 className="wishlist-name">{item.productId.name}</h3>
                  <p className="wishlist-price">Price: ${item.productId.price}</p>
                  <button className="wishlist-remove" onClick={() => handleRemoveFromWishlist(item.productId._id)}>
                    Remove ❌
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Foot />
    </>
  );
};

export default WishList;
