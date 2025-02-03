import React, { useState } from 'react';
import { getparkingdetilsApi } from '../services/allApi';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const navigate = useNavigate()

  const [vehicleNumber, setVehicleNumber] = useState('');
  const [totalTimeInHours, setTotalTimeInHours] = useState(null);  // state for total time
  const [totalAmount, setTotalAmount] = useState(null);  // state for total amount

  // input change for vehicle number
  const handleChange = (e) => {
    setVehicleNumber(e.target.value);
  };

  // submission and fetch parking details
  const handleSubmit = async () => {
    const result = await getparkingdetilsApi(vehicleNumber);
    console.log(result);

    if (result.status === 200) {
      setTotalTimeInHours(result.data.totalTimeInHours);
      setTotalAmount(result.data.totalAmount);
    }
  };

  //function checkout
  const submitCheeckout = () => {
    alert('Checkout sucussfully')
    navigate('/')
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 p-4">

      <div className="bg-gray-800 mb-8 p-6 rounded-xl shadow-lg w-full max-w-md text-white space-y-4">
        <h2 className="text-lg font-semibold text-center">Enter Vehicle Details</h2>
        <input
          type="text"
          placeholder="Enter Vehicle Number"
          className="w-full p-2 border rounded-md bg-gray-700 text-white placeholder-gray-400"
          value={vehicleNumber}
          onChange={handleChange}
        />
        <button
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      {totalTimeInHours && totalAmount !== null && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md text-white text-center space-y-4">
          <h2 className="text-lg font-semibold">Checkout</h2>
          <p className="text-gray-300">Your Vehicle Number: <span className="font-bold">{vehicleNumber}</span></p>
          <p className="text-gray-300">Total Time: <span className="font-bold">{totalTimeInHours} hours</span></p>
          <p className="text-gray-300">Total Amount: <span className="font-bold">${totalAmount}</span></p>
          <button onClick={submitCheeckout} className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Checkout</button>
        </div>
      )}

    </div>
  );
}

export default Checkout;
