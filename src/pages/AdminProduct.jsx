import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './AdminProduct.css'
import axios from "axios";

const AdminProduct = () => {
  const [products, setProducts] = useState([]); // Initialize as empty array
  const [error, setError] = useState(""); // To show any error messages

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/products", {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });

        console.log("Response Data:", response.data); // Debug the response

        // Ensure the response is an array or contains an array (e.g., response.data.products)
        if (Array.isArray(response.data)) {
          setProducts(response.data); // Directly set the products array
        } else if (response.data && Array.isArray(response.data.allProduct)) {
          setProducts(response.data.allProduct); // Access products inside the response object
        } else {
          setError("The response data is not in the expected format.");
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        setError("Error fetching products.");
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); 

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/deleteProduct/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setProducts(products.filter((product) => product._id !== id)); 
    } catch (error) {
      setError("Error deleting product.");
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="product-list-container">
      <h2>Product List</h2>
      {error && <p className="error-message">{error}</p>} 
      <Link to="/adminAddProduct" className="add-product-link">Add New Product</Link>
      <ul>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <li key={product._id} className="product-item">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <div className="actions">
                <Link to={`/adminEditProduct/${product._id}`} className="edit-btn">Edit</Link>
                <button onClick={() => handleDelete(product._id)} className="delete-btn">Delete</button>
              </div>
            </li>
          ))
        ) : (
          <p>No products available.</p> 
        )}
      </ul>
    </div>
  );
};

export default AdminProduct;
