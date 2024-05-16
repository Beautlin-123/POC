import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { databaseURL } from '../globals/globalUrl';
import html2pdf from 'html2pdf.js';
import Sign from '../assets/images/Signature.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
<<<<<<< Updated upstream
import { Document, Packer, Paragraph, TextRun } from "docx";
=======





>>>>>>> Stashed changes

export const Invoice = () => {
    const [cartItems, setCartItems] = useState([]);
    const [address, setAddress] = useState([]);
    const [fpids, setFpids] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const FixedPriceId = new URLSearchParams(window.location.search);
        const fpid = FixedPriceId.get('fpid');
        setFpids(fpid);
        fetchCartItems();
        getAddress();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(databaseURL + 'cart/cartItems');
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const getAddress = async () => {
        try {
            const userEmail = 'sbeautlinsbeautlin@gmail.com';
            const response = await axios.get(databaseURL + 'user/email/' + userEmail);
            setAddress(response.data.user);
        } catch (error) {
            console.error('Error fetching the address:', error);
        }
    };

    const calculateSubtotal = (quantity, price) => {
        return price * quantity;
    };

    const [totalPrice, setTotalPrice] = useState(0);
    const contentRef = useRef(null);

    const generatePDF = () => {
        const content = contentRef.current;
        html2pdf().from(content).save();
    };
<<<<<<< Updated upstream
=======
    const generateWord=()=>{
       
    }
    const OrderCartItems = async() =>{
        try {
          const response = await axios.delete(databaseURL + 'cart/byStatus');
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      }
>>>>>>> Stashed changes

    const generateWord = () => {
        // HTML template for the invoice
        const htmlContent = `
            <style>
                table {
                    border-collapse: collapse;
                    width: 100%;
                }
                th, td {
                    border: 1px solid black;
                    padding: 8px;
                }
                th {
                    text-align: left;
                    background-color: #f2f2f2;
                }
                .invoice-heading {
                    text-align: center;
                }
            </style>
            <h1 class="invoice-heading">INVOICE</h1>
            <p>Invoice: Invoice_123</p>
            <p>Date: ${formattedDate}</p>
            <p>Address: ${address.address}</p>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${cartItems.map(item => `
                        <tr>
                            <td>${item.product.name}</td>
                            <td>${item.product.price}</td>
                            <td>${item.quantity}</td>
                            <td>${calculateSubtotal(item.quantity, item.product.price)}</td>
                        </tr>
                    `).join('')}
                    <tr>
                        <td colspan="3">Discount Amount</td>
                        <td>$10</td>
                    </tr>
                    <tr>
                        <td colspan="3">Total Price</td>
                        <td> ${fpids}</td>
                    </tr>
                        
                </tbody>
            </table>
          
            <p>This invoice serves as a formal request for payment...</p>
            
        `;
    
        // Convert HTML to Word document
        const doc = new Blob([htmlContent], { type: 'application/msword' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(doc);
        link.download = 'invoice.doc';
        link.click();
    };
    
    
    const OrderCartItems = async () => {
        try {
            const response = await axios.delete(databaseURL + 'cart/byStatus');
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    useEffect(() => {
        const total = cartItems.reduce((acc, item) => {
            const subtotal = calculateSubtotal(item.quantity, item.product.price);
            return acc + subtotal;
        }, 0);
        setTotalPrice(total);
    }, [cartItems]);

    return (
        <>
            <div>
                <div style={{ textAlign: 'center', marginTop: '20px', color: "black" }} className='left32rem'>
                    <button onClick={generatePDF} className="custom-button bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                        Download PDF
                    </button>
                    <button onClick={generateWord} className="custom-button bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded word">
                        Download Word
                    </button>
                </div>
                <div className='text-white'>
                    <div ref={contentRef}>
                        <h1 className='invoice fontsize2rem'>
                            INVOICE
                        </h1>
                        <div className='row'>
                            <div className='left'>
                                <div className='col-sm-6' >
                                    <span>Invoice: Invoice_123</span><br></br>
                                    <span> Date:{formattedDate}</span>
                                </div>
                            </div>
                            <div className='right'>
                                <div className='col-sm-6' >
                                    <span>Address:{address.address}</span>
                                </div>
                            </div>
                        </div>
                        <div className='paddingleft5rem'>
                            <table className="table-auto mx-auto paddingtop7rem right10rem">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2">Product Name</th>
                                        <th className="px-4 py-2">Price</th>
                                        <th className="px-4 py-2">Quantity</th>
                                        <th className="px-4 py-2">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody className='text-white bg-black'>
                                    {cartItems.map((item) => (
                                        <tr key={item.id}>
                                            <td className="border px-4 py-2">{item.product.name}</td>
                                            <td className="border px-4 py-2">${item.product.price}</td>
                                            <td className="border px-4 py-2">{item.quantity}</td>
                                            <td className="border px-4 py-2">${calculateSubtotal(item.quantity, item.product.price)}</td>
                                        </tr>
                                    ))}
                                    <tr className="border px-4 py-2 ">
                                        <td colSpan={3} className=" font-semibold">Discount Amount:</td>
                                        <td className="border px-4 py-2 font-semibold">${'10'}</td>
                                    </tr>
                                    <tr className="border px-4 py-2 ">
                                        <td colSpan={3} className=" font-semibold">Total Price:</td>
                                        <td className="border px-4 py-2 font-semibold">${fpids}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className='paddingtop10rem'>This invoice serves as a formal request for payment for the products or services provided. Please review the items listed and remit payment according to the terms outlined. Your timely settlement is appreciated. Any queries regarding this invoice are welcomed for clarification. Thank you for your business.</p>
                        <div className='row'>
                            <div className='rightpadding'>
                                <div className='col-sm-6' >
                                    <span className='sign'>Signature:</span>
                                    <img src={Sign} className='image'></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Link to="/product">
                <div className='flex justify-center items-center'>
                    <button type="submit" className="custom-button bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded" onClick={OrderCartItems}>Submit</button>
                </div>
            </Link>
        </>
    );
}
