import React,{useState} from 'react'
import './Signup.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const Navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        formData
      );
      if(response.data.success){
        Navigate('/')
      
      }
      else{
        setMessage(response.data.message);
      }
      
    }
    catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <body id='body-main'>
      <div id='sign'>
        <div className="signup-container">
          <h2>Sign Up</h2>
          <form  onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required=""
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required=""
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required=""
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="Confirm your password"
                required=""
              />
            </div>
            <button type="submit" className="signup-btn">
              Sign Up
            </button>
            <div className="login-link">
              <p>
                Already have an account? <Link to="/login">Log In</Link>
              </p>
            </div>
          </form>
          {message && <p>{message} </p>}
        </div>

      </div>
    </body>
  )
}


export default Signup