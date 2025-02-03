import React, { useEffect, useState } from 'react';
import { data, Link } from 'react-router-dom';
import { getAllLocationApi, getRatesApi, getSpotApi, getvehicleTypeApi, sumbitFormApi } from '../services/allApi';

function Home() {
  const [locations, setLoctions] = useState([])
  const [vehicleTypes, setVehicleTypes] = useState([])
  console.log(locations);
  const [selectOption, setSelectOption] = useState({
    selectedLocation: '',
    selectedType: '',
    selectedSpot: ''
  })
  console.log('Selected options are:', selectOption);
  const [showRateCard, setShowRateCard] = useState(false); //render the card 
  const [spots, setSpots] = useState([]) // store fetched spots
  const [rates, setRates] = useState([])


  const handleLocationChange = (e) => {
    setSelectOption((prevState) => ({
      ...prevState,
      selectedLocation: e.target.value
    }))
  }
  const handleTypeChange = (e) => {
    setSelectOption((prevState) => ({
      ...prevState,
      selectedType: e.target.value
    }))

    // call getSpot function at a new vehicle type is selected
    getSpot({
      selectedLocation: selectOption.selectedLocation,
      selectedType: e.target.value
    })
  }
  const handleSpotChange = (e) => {
    const selectedSpot = e.target.value;
    setSelectOption((prevState) => ({
      ...prevState,
      selectedSpot
    }));

    // Only set showRateCard to true if a valid spot is selected, and not "No spots available"
    if (selectedSpot && selectedSpot !== "No spots available") {
      setShowRateCard(true);
      getRate() // get rates
    } else {
      setShowRateCard(false); // Hide the rate card if "No spots available" is selected
    }
  }

  //function to get all locaton
  const getAllLocation = async () => {
    const result = await getAllLocationApi()
    setLoctions(result.data)
  }
  //function to get vehicle type
  const getType = async () => {
    const result = await getvehicleTypeApi()
    console.log('avilable types are:', result.data);
    setVehicleTypes(result.data)
  }

  //function to get spots based on selected location and type
  const getSpot = async (selectOption) => {
    if (selectOption.selectedLocation && selectOption.selectedType) {
      // Assuming getSpotApi is defined and takes { selectedLocation, selectedType } as parameters
      const result = await getSpotApi(selectOption);
      console.log(result.data);
      if (result.data.length == 0) {
        alert('No spot avilable hear')
      }
      else {
        alert('select a sport')
        setSpots(result.data)
      }
    } else {
      console.log('Please select both location and vehicle type');
    }
  }

  const handleSubmitForm = () => {
    // store selectOption in sessionStorage
    sessionStorage.setItem('selectedLocation', selectOption.selectedLocation);
    sessionStorage.setItem('selectedType', selectOption.selectedType);
    sessionStorage.setItem('selectedSpot', selectOption.selectedSpot);

    console.log("Data stored in sessionStorage:", selectOption);
  }

  //function to get rate
  const getRate = async () => {
    const result = await getRatesApi()
    console.log('result data', result.data);
    setRates(result.data)
  }

  useEffect(() => {
    getAllLocation()
  }, [])
  useEffect(() => {
    getType()
  }, [])

  const matchingRate = rates.find(rate => rate.type_id === Number(selectOption.selectedType));

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 px-4 py-6">

      <h1 className="text-3xl font-bold text-white text-center mb-6 font-raleway">
        Your Parking Partner 🚗
      </h1>

      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4 text-white text-center">
        <h2 className="text-xl  font-raleway">Select Your Preferences</h2>

        <select
          className="w-full p-3 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleLocationChange}
          value={selectOption.selectedLocation}
        >
          <option value="" disabled>Select Location</option>
          {locations?.length > 0 ? (
            locations.map((item) => (
              <option key={item.location_id} value={item.location_id}>
                {item.location_name}
              </option>
            ))
          ) : (
            <option>No location available</option>
          )}
        </select>

        <select
          className="w-full p-3 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleTypeChange}
          value={selectOption.selectedType}
        >
          <option value="" disabled>Select Vehicle Type</option>
          {vehicleTypes?.length > 0 ? (
            vehicleTypes.map((item) => (
              <option key={item.type_id} value={item.type_id}>
                {item.type_name}
              </option>
            ))
          ) : (
            <option>Loading...</option>
          )}
        </select>

        <select
          className="w-full p-3 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleSpotChange}
          value={selectOption.selectedSpot}
        >
          <option value="" disabled>Select a Spot</option>
          {spots?.length > 0 ? (
            spots.map((item) => (
              <option key={item.spot_id} value={item.spot_id}>
                {item.spot_name}
              </option>
            ))
          ) : (
            <option>No spots available</option>
          )}
        </select>
      </div>

      {showRateCard && rates.length > 0 && matchingRate && (
        <div className="mt-8 bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md text-center text-white">
          <h2 className="text-lg font-semibold mb-2">Rate Board</h2>

          <p className="text-gray-300">
            Rate for one hour: <span className="font-bold text-green-400">${matchingRate.first_hour}</span>
          </p>
          <p className="text-gray-300">
            More than one hour: <span className="font-bold text-red-400">${matchingRate.additional_hour}</span>
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <Link to={'/detils'}>
              <button
                onClick={handleSubmitForm}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Accept
              </button>
            </Link>
            <button
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>

  );
}

export default Home;