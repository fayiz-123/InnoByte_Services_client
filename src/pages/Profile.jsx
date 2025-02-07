import React, { useState } from 'react';

function Profile() {
  // State to hold profile data
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Springfield, IL'
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  // Handle form submission (for now, just log the updated profile)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Profile:', profile);
    // Here you would send the updated profile to the backend
  };

  return (
    <div id='profile'>
    <div className="profile-container">
      <h2>Your Profile</h2>

      <form onSubmit={handleSubmit} className="profile-form">
        <section className="profile-section">
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={profile.name} 
            onChange={handleChange} 
            required 
          />
        </section>

        <section className="profile-section">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={profile.email} 
            onChange={handleChange} 
            required 
          />
        </section>

        <section className="profile-section">
          <label htmlFor="address">Address:</label>
          <input 
            type="text" 
            id="address" 
            name="address" 
            value={profile.address} 
            onChange={handleChange} 
            required 
          />
        </section>

        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
    </div>
  );
}

export default Profile;
