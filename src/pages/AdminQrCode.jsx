import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AdminQRCode = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/product/${id}`);
        if (response.data.success) {
          setProduct(response.data.findProduct);
        } else {
          setError("Product not found.");
        }
      } catch (error) {
        setError("Failed to load product details.");
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  // Function to download the QR Code
  const handleDownload = async () => {
    if (!product?.qrCode) return;

    try {
      const response = await fetch(product.qrCode);
      const blob = await response.blob(); // Convert image URL to a file
      const url = URL.createObjectURL(blob); // Create a downloadable URL

      // Create a hidden link element
      const link = document.createElement("a");
      link.href = url;
      link.download = `${product.name}-QRCode.png`; // Set the file name
      document.body.appendChild(link);
      link.click(); // Trigger the download
      document.body.removeChild(link);

      // Clean up the object URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading QR Code:", error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : product ? (
        <>
          <h2>QR Code for {product.name}</h2>
          {product.qrCode ? (
            <img
              src={product.qrCode}
              alt="QR Code"
              style={{ width: '200px', height: '200px', border: '2px solid black', padding: '10px' }}
            />
          ) : (
            <p>No QR Code available</p>
          )}

          {/* Download Button */}
          {product.qrCode && (
            <button onClick={handleDownload} style={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px'
            }}>
              Download QR Code
            </button>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminQRCode;
