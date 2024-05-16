import React, { useState, useEffect,useRef } from 'react';
import { PlusCircleIcon } from '@heroicons/react/16/solid';

import axios from 'axios';
import { databaseURL } from '../globals/globalUrl';
import { useNavigate } from 'react-router-dom';

const CardSymbols = {
  VISA: '💳',
  MASTERCARD: '💳',
  AMEX: '💳',
  DISCOVER: '💳',
};

const OrderComponent = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // Initialize total price state
  const [addresses,setAddresses]=useState(false);
  const myRef=useRef(null);
  const navigate=useNavigate();
  const [fpids, setFpids] = useState();
  useEffect(() => {
    const FixedPriceId = new URLSearchParams(window.location.search);
    const fpid = FixedPriceId.get('fpid');
    setFpids(fpid);
  }, []);

   // Create a new Date object to get the current date
   const currentDate = new Date();
   

   // Get the individual parts of the date (year, month, day)
   const year = currentDate.getFullYear();
   const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so we add 1
   const day = String(currentDate.getDate()).padStart(2, '0');
 
   // Format the date string (e.g., "YYYY-MM-DD")
   const formattedDate = `${year}-${month}-${day}`;


  const handlePaymentMethodSelect = (e) => {
    setPaymentMethod(e.target.value);
  };
  const addAddress = () => {
    setAddresses(true);
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentMethod || !customerName || !customerAddress) {
      setErrorMessage('Please fill out all fields.');
      return;
    }
    // Perform order submission logic here
    // For demonstration, we're showing an alert
    alert('Order placed successfully!');
    // Redirect to products page
    navigate(`/invoice?fpid=${fpids}`);
    // Reset form fields and error message
    setPaymentMethod('');
    setCustomerName('');
    setCustomerAddress('');
    setErrorMessage('');
  };

  // const OrderCartItems = async() =>{
  //   try {
  //     const response = await axios.delete(databaseURL + 'cart/byStatus');
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Error fetching cart items:', error);
  //   }
  // }

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(databaseURL + 'cart/cartItems');
      console.log(response.data);
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };
  
  

  // Function to calculate the subtotal for each item
  const calculateSubtotal = (quantity, price) => {
    const subtotal = price * quantity;
    return subtotal;
  };
useEffect(()=>{
  fetchCartItems();
},[])

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      const subtotal = calculateSubtotal(item.quantity, item.product.price);
      return acc + subtotal;
    }, 0);
    setTotalPrice(total);
  }, [cartItems]);

  return (
    <div>
      <div className='flex flex-row justify-center'>
      <h1 className='text-orange-500 orderheader'>ORDER DETAILS</h1><br/>
      
      </div>
  
    <div className='flex flex-row justify-center'>
      <form onSubmit={handleSubmit}>
        <div >
 <p className='text-white justify-between '>Date    :<input type='text' className='date'  readOnly defaultValue={formattedDate}></input></p><br/><br/>
        
        
       
        <p className='text-white justify-between '>Total Price:$ <input type='text' className='price' readOnly defaultValue={fpids}></input></p><br/><br/>
        <span className='paddingbottom1rem'>  <label htmlFor="paymentMethod" className='text-white '>Payment Method : </label>
          <span className='right18px'><select id="paymentMethod" value={paymentMethod} onChange={handlePaymentMethodSelect} >
            <option value="">Select Payment Method</option>
            <option value="VISA">Visa</option>
            <option value="MASTERCARD">Mastercard</option>
            <option value="AMEX">American Express</option>
            <option value="DISCOVER">Discover</option>
          </select></span></span>
        </div><br />
        <div className='text-white paddingbottom1rem paddingtop15rem'>
          <label htmlFor="customerName">Customer Name :</label>
          <input type="text" id="customerName" className='left188rem left16px' value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        </div><br />
        <div className='text-white paddingbottom2rem'>
          <label htmlFor="customerAddress">Customer Address:</label>
          <input type="text" id="customerAddress" className='left2rem left8px' value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
          <button type="button" onClick={addAddress} className='left15rem'><PlusCircleIcon className="h-5 w-5 text-white" /></button><br/><br/>
          {addresses && <input className='address'></input>}
        </div><br />
        
        
        
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        
        
        
             
        <div className='flex justify-center items-center'>
        <button type="submit" className="custom-button bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded" >Submit</button>
        </div> 
      </form>
      </div>
      
      
      <br /><br /><br /><br/>
      <div className='flex flex-row justify-center items-center'>


        <div className="grid grid-cols-4 gap-4">
          <div className="h-20 w-20">
          <img src="https://tse2.mm.bing.net/th/id/OIP.FOBIMRIyYSVQzLLM0RzwAgHaD4?w=343&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="Payment Method 1" />
            </div>
            <div className="h-20 w-20">

          <img src="https://tse1.mm.bing.net/th/id/OIP.IV_77KhZAhXqe5yPlFv15AHaE1?w=250&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="Payment Method 2" />
          </div>
          <div className="h-20 w-20">

          <img src="https://tse4.mm.bing.net/th/id/OIP.1sCtYs-dM8A3QeYgEwQ7-AAAAA?rs=1&pid=ImgDetMain" alt="Payment Method 3" />
           </div>
           <div className="h-20 w-20">
          <img src="https://tse1.mm.bing.net/th/id/OIP.OiWwGKp35Iv06-cKUO1A4AHaEo?w=262&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="Payment Method 4" />
        </div>
        </div>
      </div>
    </div>
    


  );
};

export default OrderComponent;
