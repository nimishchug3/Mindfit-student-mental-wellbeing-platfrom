import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
export default function CaffeineEntries() {
    const [intakeData, setIntakeData] = useState([]);
  
    useEffect(() => {
      // Fetch intake data from backend upon component mount
      const fetchIntakeData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/v1/caffeine/', {
            withCredentials: true, // Make sure to send cookies when making the request
          });
          setIntakeData(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching caffeine intake data: ', error);
        }
      };
  
      fetchIntakeData();
    }, []); // Empty dependency array ensures this effect runs only once on mount
  
    return (
      <div className="mt-10 text-white">
        {intakeData.map((entry, index) => (
          <div key={index}>
            <div>Product Type: {entry.productType}</div>
            <div>Total Caffeine Consumed: {entry.caffeineAmount} mg</div>
            <div>Time: {new Date(entry.timestamp).toLocaleString()}</div>
            <div>Quantity: {entry.quantity}</div>
            <hr />
          </div>
        ))}
      </div>
    );
  }