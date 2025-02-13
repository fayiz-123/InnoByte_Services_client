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

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) {
      setAddToCartError("No product details available.");
      return;
    }

    try {
      // Assuming you have some authentication token for the logged-in user
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

  return (
    <>
      <Nav />
      <div id="product-detail">
        {loading ? (
          <p className="loading-text">Loading product details...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : product ? (
          <div className="product-container">
            {/* Product Image Section */}
            <div className="product-image">
              <img src={`http://localhost:3000/uploads/${product.image}`} alt={product.name} />
            </div>

            {/* Product Details Section */}
            <div className="product-info">
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              <h3 className="price">Price: ${product.price}</h3>

              {/* Add to Cart Button */}
              <button className="add-to-cart" onClick={handleAddToCart}>
                Add to Cart
              </button>

              {addToCartError && <p className="error-text">{addToCartError}</p>}
            </div>
          </div>
        ) : (
          <p className="error-text">Product not found.</p>
        )}
      </div>
      <Foot />
    </>
  );
};

export default ProductDetails;
