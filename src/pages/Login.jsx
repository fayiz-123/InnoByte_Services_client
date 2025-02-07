import React from 'react'
import './Login.css'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Login() {
  const Navigate =useNavigate();
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })
  const[message,setMessage]=useState("")
  const handleChange= (e)=>
  {
    setFormData({...formData,[e.target.name]: e.target.value});
  }
  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try {
      const response =await axios.post(
        "http://localhost:3000/login",
        formData
      );
      if(response.data.success)
      {
        setMessage(response.data.message)
        Navigate('/')
      }
      else{
        setMessage(response.data.message)
      }
      
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
      
    }
   
  }
  return (
    <div id='login'>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="Enter your email"
              required=""
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              placeholder="Enter your password"
              required=""
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          <div className="signup-link">
            <p>
            
              Don't have an account? <Link to="/signup">Signup</Link>
            </p>
          </div>
        </form>
        {message && <p>{message} </p>}
      </div>

    </div>
  )
}

export default Login