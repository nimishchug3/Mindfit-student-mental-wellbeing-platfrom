import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

export default function CaffeineTracker() {
  const [productType, setProductType] = useState('Coffee');
  const [quantity, setQuantity] = useState('');

  const handleProductTypeChange = (event) => {
    setProductType(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/v1/caffeine/add', {
        productType,
        quantity: parseFloat(quantity),
      },
      {
        withCredentials: true, // Make sure to send cookies when making the request
      
      });

      console.log(response.data);
      setQuantity(''); // Clear the quantity input after successful entry addition
      // You can perform additional actions upon successful entry addition, e.g., show a success message or update the UI
    } catch (error) {
      console.error('Error adding caffeine entry: ', error);
      // You can handle errors here if needed
    }
  };

  return (
    <div className="mt-10 bg-slate-200 rounded-2xl w-2/3 text-black">
      <center className='p-4 font-bold'>Track Your Caffeine Intake</center>
      <form className='p-8 flex flex-col gap-5' onSubmit={handleSubmit}>
        <div>
          <label className='text-lg font-bold' htmlFor="productType">Product Type:</label>
          <select id="productType" value={productType} onChange={handleProductTypeChange}>
            <option value="Coffee">Coffee</option>
            <option value="Cold Drink">Cold Drink</option>
          </select>
        </div>
        <div>
          <label className='text-lg font-bold' htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} />
        </div>
        <button className='p-4 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-800' type="submit">Add Entry</button>
      </form>
    </div>
  );

}

