import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./AdminEditProduct.css"; // Add your custom styles

const AdminEditProduct = () => {
  const { id } = useParams(); // Extract product ID from URL params
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",  // Added stock field to formData
    image: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/product/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        console.log(response.data);
        
        setFormData({
          name: response.data.findProduct.name,
          description: response.data.findProduct.description,
          price: response.data.findProduct.price,
          stock: response.data.findProduct.stock, 
          image: null,
        });
      } catch (error) {
        setError("Error fetching product details.");
        console.error("Error fetching product:", error.message);
      }
    };

    fetchProduct();
  }, [id]); 

  
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.description || !formData.price || !formData.stock) {
      setError("All fields are required.");
      return;
    }

    const productFormData = new FormData();
    productFormData.append("name", formData.name);
    productFormData.append("description", formData.description);
    productFormData.append("price", formData.price);
    productFormData.append("stock", formData.stock); 
    if (formData.image) {
      productFormData.append("image", formData.image); 
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/products/updateProduct/${id}`,
        productFormData,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "multipart/form-data", 
          },
        }
      );

      if (response.data.success) {
        setSuccess("Product updated successfully!");
        navigate("/adminProducts");
      } else {
        setError(response.data.message || "Failed to update product.");
      }
    } catch (error) {
      setError("An error occurred while updating the product.");
      console.error("Error updating product:", error);
    }
  };

  return (
    <div id="main">
      <h2>Update Product</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product Description"
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Product Price"
            required
          />
        </div>

        <div className="form-group">
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Product Stock"
            required
          />
        </div>

        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
