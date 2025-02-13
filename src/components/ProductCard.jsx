import React from 'react';
import './productCard.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div id='card'>
      <section className="products">
        <div className="product-list">
          <div className="product">
            {/* Update the image URL */}
            <img src={`http://localhost:3000/uploads/${product.image}`} alt={product.name} />
            <h3>{product.name}</h3>
            <h3>{product.description}</h3>
            <p>Price: {product.price}</p>
            {/* Navigate to product details page */}
            <button onClick={() => navigate(`/product/${product._id}`)}>Shop Now</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductCard;
