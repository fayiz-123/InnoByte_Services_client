import React from 'react'
import './productCard.css'


const ProductCard = ({product}) => {
  return (
    <div id='card'>
              <section className="products">
                   
                    
                    <div className="product-list">
                        <div className="product">
                            
                            <img src={`http://localhost:3000/${product.image}`} alt="Product"/>

                            <h3>{product.name}</h3>
                            <p>Price:{product.price}</p>
                            <button>Shop Now</button>
                        </div>
                       
                    </div>
                </section>
    </div>
  )
}

export default ProductCard