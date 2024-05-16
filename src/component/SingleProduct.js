import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { databaseURL } from '../globals/globalUrl';
import Product from './Product';

const SingleProduct = () => {
  const[product,setProduct]=useState([]);
  const {id} = useParams();
  const productId={id}
  
  useEffect(()=>{
    

    
    // console.log(productId.id);
    try {
      // Perform a POST request to add the product to the cart
      axios.get(databaseURL + 'product/'+ productId.id).then((res)=>{
        console.log(res.data.data);
        setProduct(res.data.data);
      })
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
    
   
    

  },[]);
  
  // const getSingleproduct = async () => {
  //   let productId={id}
  //   try {
  //     // Perform a POST request to add the product to the cart
  //     await axios.get(databaseURL + 'product/', { productId});
  //     alert('Product added to cart successfully!');
  //   } catch (error) {
  //     console.error('Error adding product to cart:', error);
  //     alert('Failed to add product to cart. Please try again.');
  //   }
  // };



    

  return (
    <div >
      
      <Product key="product.id.id" product={product} /> 
      {/* Render other order details */}
      
    </div>
     
  )
}

export default SingleProduct