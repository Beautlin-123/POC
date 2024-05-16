import React from 'react';
import './App.css';
// import './component/styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductGrid from './component/ProductGrid';
// import products from './component/products';
import background from './assets/images/background.jpg';
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './component/Home';
import Cart from './component/Cart';
import Form from './component/Form';
import Order from './component/Order';
import SingleProduct from './component/SingleProduct';
import { Invoice } from './component/Invoice';

function App() {
  const containerStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '20px'
  };

  return (
    <Router>
        
        <Header />
        <div className='App' style={containerStyle}>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<ProductGrid  heading="PRODUCTS" />} />
          <Route path="/product" element={<ProductGrid  heading="PRODUCTS" />} />
          <Route path="/product/cart" element={<Cart />} />
           <Route path="/form" element={<Form/>}></Route>
           <Route path="/order" element={<Order/>}></Route>
           <Route path="/singleproduct/:id" element={<SingleProduct/>}/>
           <Route path="/invoice" element={<Invoice/>}/>
        </Routes>
        </div>

        <Footer />
    </Router>
  );
}

export default App;
