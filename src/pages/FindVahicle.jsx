import React, { useState } from 'react';
import { getSpotdetilsApi } from '../services/allApi';

function FindVahicle() {
    const [vehicleNumber, setVehicleNumber] = useState('');

    const [spotDetails, setSpotDetails] = useState(null);

    const handleInputChange = (e) => {
        setVehicleNumber(e.target.value);
    };

    const findLocation = async () => {
        try {
            const result = await getSpotdetilsApi(vehicleNumber);
            console.log(result.data);

            if (result.status === 200) {
                setSpotDetails(result.data);
            }
        } catch (error) {
            console.error('Error fetching spot details:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 p-4">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md text-white space-y-4">
                <h2 className="text-lg font-semibold text-center">Enter Vehicle Number</h2>
                <input
                    type="text"
                    placeholder="Enter Vehicle Number"
                    className="w-full p-2 border rounded-md bg-gray-700 text-white placeholder-gray-400"
                    value={vehicleNumber}
                    onChange={handleInputChange}
                />
                <button
                    onClick={findLocation}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Submit
                </button>
            </div>

            {spotDetails && (
                <div className="mt-6 bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md text-white text-center">
                    <h2 className="text-lg font-semibold">Your Parked Place</h2>
                    <p className="text-gray-300">Your parking spot is:
                        <span className="font-raleway text-blue-500">
                            {spotDetails.spot_name}
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
}

export default FindVahicle;
