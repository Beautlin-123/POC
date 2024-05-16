
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Ratings'; // Import the Rating component
import axios from 'axios';
// import '../component/styles.css';
import { databaseURL } from '../globals/globalUrl';
import Home from './Home';
import {useNavigate} from 'react-router-dom'

const Product = ({ product }) => {
  
  const [rating, setRating] = useState(0);

  

  const addToCart = async () => {
    try {
      // Perform a POST request to add the product to the cart
      await axios.post(databaseURL + 'cart/', { productId: product._id});
      alert('Product added to cart successfully!');
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };
  

  const placeOrder = () => {
    // Logic to place order
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };
  // const navigate=useNavigate();
  // const  viewProduct=( )=>{
   
  //   alert(product._id);
  //   alert (product.price);
  //   navigate('/singleproduct/1');
  // }
const navigate=useNavigate();
const viewProduct=(id)=>{
  alert(id)
  navigate(`/singleproduct/${id}`);
}

  
 

  return (
    <div className="basis-1/4 flex flex-col items-center bg-gray-800 rounded-lg p-4">
      <h1> Add to Cart</h1>
    <div className="h-48 w-full flex justify-center items-center mb-4">
      <img src={product.imageurl} alt="Product" className="block h-full max-w-full" />
    </div>
    <div className="text-center flex-grow">
      <h3 className="text-white text-lg font-semibold mb-2">{product.name}</h3>
      <p  onClick={()=>viewProduct(product._id)} className="text-white mb-2">{product.description} </p>
      {/* Display the Rating component */}
      <Rating onChange={handleRatingChange} />
      <p className="text-white mt-2">Price:${product.price}</p>
    </div>
    <div className="mt-auto">
      {/* Remove Link to="/product/cart" and replace with onClick={addToCart} */}
      <button onClick={addToCart} className="custom-button bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
        Add to Cart
      </button>
    </div>
  </div>
  

  
  );
};

export default Product;


