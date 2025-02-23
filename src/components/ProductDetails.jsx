import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../components/Nav';
import Foot from '../components/Foot';
import './productDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addToCartError, setAddToCartError] = useState(null);
  const [wishlistMessage, setWishlistMessage] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/product/${id}`);
        if (response.data.success) {
          setProduct(response.data.findProduct);
        } else {
          setError("Product not found.");
        }
      } catch (error) {
        setError("Failed to load product details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) return;
        const response = await axios.get('http://localhost:3000/wishlist/getWishList', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setWishlist(response.data.getWishList.products);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    fetchProduct();
    fetchWishlist();
  }, [id]);

  useEffect(() => {
    if (product && wishlist.length > 0) {
      const exists = wishlist.some(item => item.productId._id === product._id);
      setIsInWishlist(exists);
    }
  }, [product, wishlist]);

  const handleAddToCart = async () => {
    if (!product) {
      setAddToCartError("No product details available.");
      return;
    }
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setAddToCartError("Please log in to add items to the cart.");
        return;
      }
      const response = await axios.post(
        'http://localhost:3000/cart/addToCart',
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert('Item added to cart successfully!');
      } else {
        setAddToCartError(response.data.message);
      }
    } catch (error) {
      setAddToCartError("Failed to add item to cart.");
      console.error(error);
    }
  };

  const handleAddToWishlist = async () => {
    if (!product) {
      alert("No product details available.");
      return;
    }
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert("Please log in to add items to the wishlist.");
        return;
      }
      const response = await axios.post(
        'http://localhost:3000/wishlist/addToWishList',
        { productId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert("Item added to wishlist!");
        setIsInWishlist(true);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Failed to add item to wishlist.");
      console.error(error);
    }
  };

  return (
    <>
      <Nav />
      <div id="product-detail">
        {loading ? (
          <p id="loading-text">Loading product details...</p>
        ) : error ? (
          <p id="error-text">{error}</p>
        ) : product ? (
          <div id="product-container"> 
            <div id="product-image">
              <img src={`http://localhost:3000/uploads/${product.image}`} alt={product.name} />
            </div> 
            <div id="product-info">
              <h1 id="product-name">{product.name}</h1>
              <p id="product-description">{product.description}</p>
              <h3 id="product-price">Price: ${product.price}</h3>
              <h4 id="product-stock">Stock: {product.stock} left</h4>

              <div id="button-container">
                <button id="add-to-cart" onClick={handleAddToCart}>
                  Add to Cart
                </button>

                {isInWishlist ? (
                  <span id="wishlist-icon">❤️</span>
                ) : (
                  <button id="wishlist-button" onClick={handleAddToWishlist}>
                    ❤️ Add to Wishlist
                  </button>
                )}
              </div>

              {addToCartError && <p id="add-to-cart-error">{addToCartError}</p>}
              {wishlistMessage && <p id="wishlist-message">{wishlistMessage}</p>}
            </div>
          </div>
        ) : (
          <p id="error-text">Product not found.</p>
        )}
      </div>
      <Foot />
    </>
  );
};

export default ProductDetails;
