// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Fetch products from the server
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  // Handle delete action with confirmation
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.delete(`http://localhost:5000/api/products/${id}`)
        .then(response => {
          alert(response.data.message);
          setProducts(products.filter(product => product._id !== id));
        })
        .catch(error => {
          console.error('Error deleting product:', error);
          alert('Failed to delete product');
        });
    }
  };

  // Filtering products based on search and price range
  const filteredProducts = products.filter(product => {
    const isInPriceRange =
      (minPrice === '' || product.price >= minPrice) &&
      (maxPrice === '' || product.price <= maxPrice);
    const matchesSearchTerm =
      product.name.toLowerCase().includes(searchTerm.toLowerCase());

    return isInPriceRange && matchesSearchTerm;
  });

  // Alert for low stock (product quantity less than 5)
  const renderStockAlert = (quantity) => {
    if (quantity < 5) {
      return <span className="badge bg-warning text-dark">Low Stock</span>;
    }
    return null;
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Product List</h2>

      {/* Search and Filter Controls */}
      <div className="mb-4 d-flex justify-content-between">
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="d-flex">
          <input
            type="number"
            className="form-control me-2"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Show loading state while fetching products */}
      {loading ? (
        <p>Loading products...</p>
      ) : filteredProducts.length > 0 ? (
        <ul className="list-group">
          {filteredProducts.map(product => (
            <li key={product._id} className="list-group-item d-flex justify-content-between align-items-center border shadow-sm p-3 mb-2 rounded">
              <div>
                <strong>{product.name}</strong> - ${product.price}
                {renderStockAlert(product.quantity)}
              </div>
              <div>
                <Link to={`/edit/${product._id}`} className="btn btn-warning btn-sm mr-2">
                  <i className="bi bi-pencil-square"></i> Edit
                </Link>
                <button onClick={() => handleDelete(product._id)} className="btn btn-danger btn-sm">
                  <i className="bi bi-trash"></i> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}

      {/* Add New Product Button */}
      <Link to="/add" className="btn btn-primary mt-3">Add New Product</Link>
    </div>
  );
};

export default ProductList;
