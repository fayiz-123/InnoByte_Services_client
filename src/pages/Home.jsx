import React, { useState, useEffect } from 'react';
import './Home.css';
import ProductCard from '../components/ProductCard';
import Nav from '../components/Nav';
import Foot from '../components/Foot';
import axios from 'axios';

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/products/allProducts');
                setProducts(response.data.allProduct);
            } catch (error) {
                setError("Failed to load products. Please try again.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter products based on search query
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Nav />
            <div id="home-section">
                <main className="main-content">
                    <section className="hero">
                        <h2>Welcome to ShopEasY!</h2>
                        <p>Your favorite online store for amazing deals.</p>
                    </section>

                    {/* Search Bar */}
                    <div className="search-container">
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="🔍 Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <h2><u>Featured Products</u></h2>

                    {loading ? (
                        <p>Loading products...</p>
                    ) : error ? (
                        <p style={{ color: "red" }}>{error}</p>
                    ) : (
                        <div className='card-container'>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            ) : (
                                <p>No products found.</p>
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
