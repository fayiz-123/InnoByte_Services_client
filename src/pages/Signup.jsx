import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
  });

  const [message, setMessage] = useState('');

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        address: formData.address,  
      });

      if (response.data.success) {
        navigate('/login'); 
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div id="sign">
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              placeholder="Enter your username" 
              value={formData.username} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Enter your email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Enter your password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              placeholder="Confirm your password" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Address Fields */}
          <h3>Address</h3>
          <div className="input-group">
            <label htmlFor="street">Street</label>
            <input 
              type="text" 
              id="street" 
              name="street" 
              placeholder="Enter your street" 
              value={formData.address.street} 
              onChange={handleChange} 
            />
          </div>

          <div className="input-group">
            <label htmlFor="city">City</label>
            <input 
              type="text" 
              id="city" 
              name="city" 
              placeholder="Enter your city" 
              value={formData.address.city} 
              onChange={handleChange} 
            />
          </div>

          <div className="input-group">
            <label htmlFor="state">State</label>
            <input 
              type="text" 
              id="state" 
              name="state" 
              placeholder="Enter your state" 
              value={formData.address.state} 
              onChange={handleChange} 
            />
          </div>

          <div className="input-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input 
              type="text" 
              id="postalCode" 
              name="postalCode" 
              placeholder="Enter your postal code" 
              value={formData.address.postalCode} 
              onChange={handleChange} 
            />
          </div>

          <div className="input-group">
            <label htmlFor="country">Country</label>
            <input 
              type="text" 
              id="country" 
              name="country" 
              placeholder="Enter your country" 
              value={formData.address.country} 
              onChange={handleChange} 
            />
          </div>

          {/* Signup Button */}
          <button type="submit" className="signup-btn">Sign Up</button>

          {/* Login Link */}
          <div className="login-link">
            <p>Already have an account? <Link to="/login">Log In</Link></p>
          </div>
        </form>

        {/* Display Error Message */}
        {message && <p className="error-message">{message}</p>}
      </div>
    </div>
  );
}

export default Signup;
