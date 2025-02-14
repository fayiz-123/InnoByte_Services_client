import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav'
import Foot from '../components/Foot'
import './Profile.css'

function UpdateProfile() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    }
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); 
  let id;
  useEffect(() => {
    
    const fetchProfile = async () => {
      try {
        const tokenn = localStorage.getItem("authToken")
        const decoded = jwtDecode(tokenn);
        console.log(decoded);

        id = decoded.userID;
        console.log(id);

        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(response.data.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address')) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name.split('.')[1]]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');

    try {
      const tokenn = localStorage.getItem("authToken")
        const decoded = jwtDecode(tokenn);
        console.log(decoded);

        id = decoded.userID;
        console.log(id);
      console.log("sum",id);
      
      const response = await axios.put(
        `http://localhost:3000/updateProfile/${id}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
      navigate('/profile');  
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Nav/>
    <div id='profile'>
    <div className="update-profile-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled
          />
        </div>
        <h3>Address</h3>
        <div>
          <label>Street</label>
          <input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>State</label>
          <input
            type="text"
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Postal Code</label>
          <input
            type="text"
            name="address.postalCode"
            value={formData.address.postalCode}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Country</label>
          <input
            type="text"
            name="address.country"
            value={formData.address.country}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
    <Foot/>
    </>
  );
}

export default UpdateProfile;
