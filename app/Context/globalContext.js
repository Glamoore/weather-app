"use client";

//Imports
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import defaultCountries from "../Utilities/defaultCountries";

import { debounce } from "lodash";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  // Creating a state to hold the weather forecast data from the Open Weather API for global use
  const [forecast, setForecast] = useState({});

  // Creating a state to hold the air pollution data from the Open Weather API for global use
  const [airQuality, setAirQuality] = useState({});

  // Creating a state to hold the five day forecast data from the Open Weather API for global use
  const [dailyForecast, setDailyForecast] = useState({});

  // Creating a state to hold the five day forecast data from the Open Weather API for global use
  const [uvIndex, setUvIndex] = useState({});

  // Creating a state to hold the list of countries for the search bar
  const [geoCodedList, setGeoCodedList] = useState(defaultCountries);

  // Creating a state to hold the user input from the search bar and for it to be updated
  const [inputValue, setInputValue] = useState("");

  //Creating a state to hold the user input from the search bar and updated the active city in the DOM
  const [activeCityCoords, setActiveCityCoords] = useState([
    51.5074, 0.1278,
  ]);


  // Fetch the weather forecast data from the Open Weather API
  const fetchForecast = async (lat, lon) => {
    try {
      // API endpoint of the get request
      const res = await axios.get(`Api/Weather?lat=${lat}&lon=${lon}`);

      // Storing the weather forecast data to its global state
      setForecast(res.data);
    } catch (error) {
      console.log("Error fetching forecast data: ", error.message);
    }
  };

  // Fetch air pollution data from the Open Weather API
  const fetchAirQuality = async (lat, lon) => {
    try {
      // API endpoint of the get request
      const res = await axios.get(`Api/Pollution?lat=${lat}&lon=${lon}`);

      // Storing the air pollution data to its global state
      setAirQuality(res.data);
    } catch (error) {
      console.log("Error retrieving air quality data: ", error.message);
    }
  };

  // Fetch the five day forecast data from the Open Weather API
  const fetchFiveDayForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`Api/FiveDayForecast?lat=${lat}&lon=${lon}`);

      // Storing the five day forecast data to its global state
      setDailyForecast(res.data);
    } catch (error) {
      console.log("Error fetching five day forecast data", error.message);
    }
  };

// Fetch the Geo coded list data from the Open meteo API
const fetchGeoCodedList = async (search) => {
  try {
    const res = await axios.get(`Api/Geocoded?search=${search}`);

    setGeoCodedList(res.data);
  } catch (error) {
    console.log("Error fetching geocoded list: ", error.message);
  }
}; 

  // Fetch the UV index data from the Open meteo API
  const fetchUvIndex = async (lat, lon) => {
    try {
      const res = await axios.get(`Api/Uv?lat=${lat}&lon=${lon}`);

      // Storing the UV index data to its global state
      setUvIndex(res.data);
    } catch (error) {
      console.log("Error fetching the UV data", error.message);
    }
  };

  // Handle user input

  const handleInput = (e) => {
    setInputValue(e.target.value);

    if (e.target.value === "") {
      setGeoCodedList(defaultCountries);
    }
  };

  // debounce function
  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      fetchGeoCodedList(search);
    }, 500);

    if (inputValue) {
      debouncedFetch(inputValue);
    }

     // cleanup
     return () => debouncedFetch.cancel();
    }, [inputValue]);


  // Initial fetch request for all API data
  useEffect(() => {
    fetchForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
    fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
  }, [activeCityCoords]);

  // Sharing data with the rest of the app
  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
        dailyForecast,
        uvIndex,
        geoCodedList,
        inputValue,
        handleInput,
        setActiveCityCoords,
      }}
    >
      <GlobalContextUpdate.Provider value={{setActiveCityCoords}}>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
