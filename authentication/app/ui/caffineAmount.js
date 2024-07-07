import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CaffeineAmount() {
  const [amount, setAmount] = useState(0);
  const [normalAmount, setNormalAmount] = useState(400); // Assuming normal caffeine intake is 400mg

  useEffect(() => {
    const fetchCaffeineAmount = async () => {
      try {
        // Fetch total caffeine amount consumed by the user
        const response = await axios.get("http://localhost:8000/api/v1/caffeine/total",{
            withCredentials: true, // Make sure to send cookies when making the request
        });
        console.log(response.data);
        // Extract total caffeine amount from the response
        const totalCaffeineAmount = response.data.totalCaffeineAmount;
 
        // Update state with the total caffeine amount
        setAmount(totalCaffeineAmount);
      } catch (error) {
        console.error("Error fetching total caffeine amount:", error.message);
      }
    };

    fetchCaffeineAmount();
  }, []);

  // Calculate whether the user is exceeding or not reaching the normal caffeine intake
  const deviation = amount - normalAmount;
  const status = deviation > 0 ? "exceeding" : deviation < 0 ? "decreasing" : "within";

  return (
    <div className="text-white">
      <h2>Your Amount Consumed is {amount} mg</h2>
      <h2>Normal Amount is {normalAmount} mg</h2>
      <h2>You are {status} the normal amount by {Math.abs(deviation)} mg</h2>
    </div>
  );
}
