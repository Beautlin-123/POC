import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./Header.css"
import logo from '../assets/images/logo.jpg'; // Import your logo image
import axios from 'axios';
import { databaseURL } from '../globals/globalUrl';


const Header = () => {
  const [countItems, setCountItems] = useState(0);
  const countCartItems = async () => {
    try {
      // Perform a POST request to add the product to the cart
      axios.get(databaseURL + 'cart/countItems').then((res) => {
        const itemCount = res.data.count;
        setCountItems(itemCount);
      })

    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
    


  }

  useEffect(() => {

    countCartItems();
}, []);


  return (
    <header className=' bg-orange-400'>

      <nav className='h-5rem mx-auto container'>
        <div className='flex justify-between items-center'>
          <div className='flex'>
            <img src={logo} alt="Logo" className='logo' />
            <div class="flex items-center padding05rem">
              <Link to="/product" className='px-4 py-2 rounded' >Home</Link>
              <Link to="/product" className='px-4 py-2 rounded'>Products</Link>
              <Link to="/order" className='px-4 py-2  rounded'><i class="fas fa-shopping-cart fa-2xl" />order</Link>


            </div>
          </div>
          <div className='flex flex-row size-8'>

 
            <Link to="/product/cart"  > <span class="count">{countItems} </span><span role="img" aria-label="shopping-cart" className='mx-5 shoppingcart'>🛒</span></Link>
          </div>
        </div>
        </nav>
    </header>
  )
}

export default Header;
