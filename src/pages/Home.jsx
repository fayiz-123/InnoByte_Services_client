import React from 'react'
import './Home.css'
import ProductCard from '../components/productCard'
import { useState,useEffect } from 'react'
import Nav from '../components/Nav'
import Foot from '../components/Foot'
import axios from 'axios'




function Home() {
    const[products,setProducts]=useState([])
    useEffect(()=>{
        try {
            const fetchProducts = async ()=>{
                const response =await axios.get('http://localhost:3000/products/allproducts')
                setProducts(response.data)
                console.log(response.data);
                
            }
            fetchProducts()
            
            
        } catch (error) {
            console.error(error)
            
        }
      
    },[])
   
    return (

        <>
        <Nav/>
        <div id="home-section">
            <main className="main-content">
                <section className="hero">
                    <h2>Welcome to ShopEase!</h2>
                    <p>Your favorite online store for amazing deals.</p>
                </section>
                <h2><u>Featured Products</u></h2>
                <div className='card-container'>
                    {products&&products.map((product)=>(
                      <ProductCard key={product._id} product={product} />
                    ))}                  
                </div>
          
            </main>
            </div>
            <Foot/>
        </>
    

    )
}


export default Home