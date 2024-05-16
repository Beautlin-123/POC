
import React, { useEffect, useState } from 'react';
import Product from './Product';
import axios from 'axios';
import { databaseURL } from '../globals/globalUrl';
import Home from './Home';

const ProductGrid = ({ heading }) => {

  const [products, setProducts] = useState([]);

  const productData = () => {
    axios.get(databaseURL + 'product')
      .then(response => {
        console.log(response.data.data);
        setProducts(response.data.data);

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  useEffect(() => {
    productData();
  }, []);

  return (
    <div className='mx-auto container'>
      <Home/>
      <div className='flex flex-row'>


        <div className="grid grid-cols-3 gap-3">

          {products.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div >
  );
};

export default ProductGrid;



