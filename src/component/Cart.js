import React, { useState, useEffect ,useRef} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { databaseURL } from '../globals/globalUrl';


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0); // Initialize total price state
  const [showServiceInfo, setShowServiceInfo] = useState(false);
  const [showWarrantyInfo, setShowWarrantyInfo] = useState(false);
  const [showReplacementInfo, setShowReplacementInfo] = useState(false);
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);
  const[discountCode,setDiscountCode]=useState('');
  const[discountAmount,setDiscountAmount]=useState([]);
  const [isVisible,setIsVisible]=useState(false);
  const[fixedPrice,setFixedPrice]=useState(0);
  const quantityValue = useRef(null);
  const myRef=useRef(null);
  
  const fetchCartItems = async () => {
    try {
     console.log('binu')
      const response = await axios.get(databaseURL + 'cart/cartItems');
      console.log(response.data);
      setCartItems(response.data);
    
    
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };
  const giftVoucher = async () => {
    try {
        const userDiscount='Amazon123';
     
      const response = await axios.get(databaseURL + 'voucher/discountCode/'+userDiscount);
      
      console.log(response.data);
      const fetchedDiscountCode=response.data.voucher
      setDiscountCode(fetchedDiscountCode);
    
    
    } catch (error) {
      console.error('Error fetching the voucher :', error);
    }
  };
 
  
  
  

  
  useEffect(() => {
    
    fetchCartItems();
    giftVoucher();
    applyCoupon();
  },[]);

  // Function to remove a product from the cart
  const removeProduct = async (id) => {
    try {
      await axios.delete(databaseURL + 'cart/' +id).then((res)=>{
        fetchCartItems();
      })
      
      const updatedCart = cartItems.filter(item => item.product.id !== id);
      setCartItems(updatedCart);
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  // Function to handle quantity change
  const handleQuantityChange = (id, value) => {
     axios.put(databaseURL +'cart/' +id,{quantity:value}).then((res)=>{
      fetchCartItems(); 
     })
   
     quantityValue.current = value;

    
    
  };
  const [DisAmount,setDisAmount]=useState();
  const applyCoupon = async () => {
    try {
      const voucherDiscount = myRef.current.value;
      const voucherAmount="10"
      const response = await axios.get(databaseURL + 'voucher/discountCode/' + voucherDiscount);
      const res = await axios.get(databaseURL + 'voucher/discountAmount/' + voucherAmount);
      console.log(response.data);
      console.log(res.data);
      let DiscountCode = response.data.voucher.discountCode;
      let DiscountAmount = response.data.voucher.discountAmount;
      setDisAmount(response.data.voucher.discountAmount);
      if (voucherDiscount === DiscountCode) {
        alert("Discount code is matched");
        const fixedPrice=totalPrice - DiscountAmount;
        setFixedPrice(fixedPrice);
        
        } else {
        alert("Discount code is not matched");
      }
    } catch (error) {
      console.error('Error fetching the voucher:', error);
    }
  };
  

  // Function to calculate the subtotal for each item
  const calculateSubtotal = (quantity,price) => {
    const subtotal =  price * quantity;
    return subtotal;
  };


  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      const subtotal = calculateSubtotal(item.quantity,item.product.price);
      return acc + subtotal;
    }, 0);
    setTotalPrice(total);
  }, [cartItems, quantities]); // Recalculate total price whenever cart items or quantities change
  const path = useNavigate();
  const Proceedtoorder=()=>{
    path(`/form?Fpid=${fixedPrice}`);
  }
  return (
    <div className="cart container mx-auto">
    {cartItems.map((item) => (
  <div key={item.id} className="cart-item bg-gray-800 rounded-lg p-4 mb-4 flex">
    <img src={item.product.imageurl} alt={item.name} className="block w-1/4 max-h-full" />
    <div className="cart-item-details flex-grow ml-4">
      <h3 className="text-white font-semibold mb-2">Name: {item.product.name}</h3>
      <p className="text-white mb-2">Description: {item.product.description}</p>
      <p className="text-white mb-2">Price: ${item.product.price}</p>
      <div className="flex items-center mb-2">
        <p className="text-white mr-2">Quantity:</p>
        <select className="bg-gray-700 text-white py-1 px-2 rounded" ref={quantityValue} value={item.quantity} onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}>
          {[...Array(10)].map((_, index) => (
            <option key={index + 1} value={index + 1}>{index + 1}</option>
          ))}
        </select>
      </div>
      <p className="text-white mb-2">Subtotal: ${calculateSubtotal(item.quantity, item.product.price)}</p>
      <div className="flex justify-end items-center mt-auto">
        <button onClick={() => removeProduct(item._id)} className="custom-button bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
          Remove
        </button>
        
      </div>
    </div>
  </div>
))}
<br /><br />

      <div className="total-price" style={{ textAlign: "center", color: "white" }}>
        Total Price: $ {totalPrice.toFixed(2)}<br /><br />
        
       
       
      

      </div >
      <br/>
      {totalPrice > 100 ? (
        <div>
        <div className='voucher'>
          
                <input className='height34px' ref ={myRef} type ="text" placeholder='Enter Coupon '></input><br></br>
                <button type="submit" className=" bottom21left14 custom-button bg-orange-500 hover:bg-orange-600
             text-white font-semibold py-1 px-2 voucher" onClick={applyCoupon}>Apply Coupon</button>
           
            
            
        </div>
        <div className="total-price" style={{ textAlign: "center", color: "white" }}>
         Price: $ {fixedPrice}<br /><br /></div>
        </div>
        
    ) : (
        <div>empty</div>
    )}
     <button className="custom-button bg-green-500 hover:bg-green-600
         text-white font-semibold py-2 px-4 rounded left27rem" onClick={Proceedtoorder} >Proceed to order</button>
       

    <div>
      <button >{isVisible ? '':''}</button>
    </div>
      <img src="https://tse2.mm.bing.net/th/id/OIP.4_p4U9ycd27HFj-dlaLmowHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.5&pid=1.7" style={{ marginBottom: '5px',height:"50px",width:"50px",borderRadius:"50px"}}/>
      <h3 style={{color:"white"}} > Offers</h3><br/><br/>
      <div className='flex flex-row'>


        <div className="grid grid-cols-3 gap-3">
          <div className='basis-1 before:'>
        <img src="https://tse3.mm.bing.net/th/id/OIP.TKId3ps59h0oMo8vfYSA_QHaD7?w=291&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"></img>
      </div>
      <div className='basis-1 before:'>
        <img src="https://tse4.mm.bing.net/th/id/OIP.2oJTrrueN3eI0hmHYJEuIgHaEc?w=266&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"></img></div>
        <div className='basis-1 before:'>
        <img src="https://tse3.mm.bing.net/th/id/OIP.YiSJYy3l3AZwsE4HizZ7wAHaDt?w=283&h=174&c=7&r=0&o=5&dpr=1.5&pid=1.7"></img></div>
      </div>
      </div><br/>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        
        <div>
          <img
            src="https://www.bing.com/th?id=OIP.j3-Lb2pbyh7i9g3MJ9bElgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
            alt="Service option available"
            style={{ marginBottom: '5px', height: "50px", width: "50px", borderRadius: "50px", cursor: "pointer" }}
            onClick={() => setShowServiceInfo(!showServiceInfo)}
          />
          <h3 style={{ color: "white", display: "inline-block", cursor: "pointer" }} onClick={() => setShowServiceInfo(!showServiceInfo)}>Service option available</h3>
          {showServiceInfo && (
            <p style={{ color: "white" }}>Additional information about service option...</p>
          )}
        </div>

        <div>
          <img
            src="https://tse1.mm.bing.net/th?q=Warranty+Logo.png&pid=ImgDet&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&w=120&h=123&c=7&dpr=1.5"
            alt="2 Year Warranty Care"
            style={{ marginBottom: '5px', height: "50px", width: "50px", borderRadius: "50px", cursor: "pointer" }}
            onClick={() => setShowWarrantyInfo(!showWarrantyInfo)}
          />
          <h3 style={{ color: "white", display: "inline-block", cursor: "pointer" }} onClick={() => setShowWarrantyInfo(!showWarrantyInfo)}>2 Year Warranty Care</h3>
          {showWarrantyInfo && (
            <p style={{ color: "white" }}>2 year warranty from the date of invoice..</p>
          )}
        </div>

        <div>
          <img
            src="https://tse1.mm.bing.net/th?id=OIP.niQy0MCdFjMEskDU1K2x2gAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
            alt="10 days Replacement by Brand"
            style={{ marginBottom: '5px', height: "50px", width: "50px", borderRadius: "50px", cursor: "pointer" }}
            onClick={() => setShowReplacementInfo(!showReplacementInfo)}
          />
          <h3 style={{ color: "white", display: "inline-block", cursor: "pointer" }} onClick={() => setShowReplacementInfo(!showReplacementInfo)}>10 days Replacement by Brand</h3>
          {showReplacementInfo && (
            <p style={{ color: "white" }}>We will need you to submit a proof of issue to verify your request.</p>
          )}
        </div>

        <div>
          <img
            src="https://www.bing.com/th?id=OIP.7ZjT-IZcuRIzwon8KIPuYgAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
            alt="Free Delivery"
            style={{ marginBottom: '5px', height: "50px", width: "50px", borderRadius: "50px", cursor: "pointer" }}
            onClick={() => setShowDeliveryInfo(!showDeliveryInfo)}
          />
          <h3 style={{ color: "white", display: "inline-block", cursor: "pointer" }} onClick={() => setShowDeliveryInfo(!showDeliveryInfo)}>Free Delivery</h3>
          {showDeliveryInfo && (
            <p style={{ color: "white" }}>The product is eligible for Free delivery.</p>
          )}
        </div>
      </div>

      
      
    </div>
  );
};

export default Cart;

