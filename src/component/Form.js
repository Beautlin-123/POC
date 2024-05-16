import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [fpids, setFpids] = useState('');
  useEffect(() => {
    const FixedPriceId = new URLSearchParams(window.location.search);
    const fpid = FixedPriceId.get('Fpid');
    setFpids(fpid);
  }, []);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    // Perform validation
    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    }
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    }

    // If there are errors, set them in state and return
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // If no errors, perform further actions like submitting the form
    window.alert('Login Successfully');
    navigate(`/order?fpid=${fpids}`);
  };

  return (
    <div>
      <h1 className='flex justify-center items-center text-orange-500'>SIGN IN</h1>
      <div className="w-full max-w-xs mx-auto">
        <form onSubmit={handleSubmit} className="bg-gray-500 border-yellow-500 border-4 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="phoneNumber">
              Phone Number:
            </label>
            <input
              className={`shadow appearance-none border border-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phoneNumber ? 'border-red-500' : ''}`}
              id="phoneNumber"
              type="tel" 
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs italic"><span role="img" aria-label="warning">⚠️</span>{errors.phoneNumber}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              className={`shadow appearance-none border border-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-orange-500' : ''}`}
              id="email"
              type="email"
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-orange-500 text-xs italic"><span role="img" aria-label="warning">⚠️</span>{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              className={`shadow appearance-none border border-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
              id="password"
              type="password"
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-xs italic"><span role="img" aria-label="warning">⚠️</span>{errors.password}</p>}
          </div>
          <div className="flex justify-center items-center">
            <button className="custom-button bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded" type="submit">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
