import React, { useState } from 'react';
import { sumbitDetilsApi } from '../services/allApi';
import { useNavigate } from 'react-router-dom';


function VehicleDetails() {

    const [data, setData] = useState({
        vehicleNumber: '',
        name: '',
        phoneNumber: ''
    })
    console.log(data);

    const [parkingData, setParkinData] = useState([])
    console.log(parkingData);


    // Function to submit details
    const submitDetils = async () => {
        // access session data
        const selectedLocation = sessionStorage.getItem('selectedLocation');
        const selectedType = sessionStorage.getItem('selectedType');
        const selectedSpot = sessionStorage.getItem('selectedSpot');

        // combine session data with form data
        const dataToSubmit = {
            ...data,
            selectedLocation,
            selectedType,
            selectedSpot
        };

        console.log('Data to Submit:', dataToSubmit);

        const result = await sumbitDetilsApi(dataToSubmit);
        if (result.status === 200) {
            alert('Parking details submitted successfully')
            setParkinData(result.data)
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 p-4">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md text-white space-y-4">
                <h2 className="text-lg font-semibold text-center">Enter Vehicle Details</h2>
                <input onChange={(e) => setData({ ...data, vehicleNumber: e.target.value })} value={data.vehicleNumber} type="text" placeholder="Enter Vehicle Number" className="w-full p-2 border rounded-md bg-gray-700 text-white placeholder-gray-400" />
                <input onChange={(e) => setData({ ...data, name: e.target.value })} value={data.name} type="text" placeholder="Enter Your Name" className="w-full p-2 border rounded-md bg-gray-700 text-white placeholder-gray-400" />
                <input onChange={(e) => setData({ ...data, phoneNumber: e.target.value })} value={data.phoneNumber} type="text" placeholder="Enter Phone Number" className="w-full p-2 border rounded-md bg-gray-700 text-white placeholder-gray-400" />
                <button onClick={submitDetils} className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
            </div>

            <div className="mt-6 bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md text-white text-center">
                <h2 className="text-lg font-semibold">Your Parked Place</h2>
                {parkingData ? (
                    <>
                        <p className="text-gray-300">Place Name:
                            <span className="font-bold text-red-400">
                                {parkingData.location ? parkingData.location.location_name : 'N/A'}
                            </span>
                        </p>
                        <p className="text-gray-300">Spot:
                            <span className="font-raleway text-blue-500">
                                {parkingData.spot ? parkingData.spot.spot_name : 'N/A'}
                            </span>
                        </p>
                        <p className="text-gray-300">Time:
                            <span className="font-raleway text-blue-500">
                                {parkingData.data
                                    ? new Date(parkingData.data.parking_time).toLocaleString()
                                    : 'N/A'}
                            </span>
                        </p>
                    </>
                ) : (
                    <p className="text-gray-300">No parking details available</p>
                )}
            </div>

        </div>
    );
}

export default VehicleDetails;