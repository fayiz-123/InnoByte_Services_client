import React, { useState, useEffect } from 'react';
import './Home.css';
import ProductCard from '../components/productCard';
import Nav from '../components/Nav';
import Foot from '../components/Foot';
import axios from 'axios';

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/products/allProducts');
                setProducts(response.data.allProduct); // Accessing the correct key
            } catch (error) {
                setError("Failed to load products. Please try again.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <Nav />
            <div id="home-section">
                <main className="main-content">
                    <section className="hero">
                        <h2>Welcome to ShopEase!</h2>
                        <p>Your favorite online store for amazing deals.</p>
                    </section>

                    <h2><u>Featured Products</u></h2>

                    {loading ? (
                        <p>Loading products...</p>
                    ) : error ? (
                        <p style={{ color: "red" }}>{error}</p>
                    ) : (
                        <div className='card-container'>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            ) : (
                                <p>No products available.</p>
                            )}
                        </div>
                    )}
                </main>
            </div>
            <Foot />
        </>
    );
}

export default Home;
