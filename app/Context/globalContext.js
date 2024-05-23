"use client";

//Imports
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

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

  // Fetch the weather forecast data from the Open Weather API
  const fetchForecast = async () => {
    try {
      // API endpoint of the get request
      const res = await axios.get("Api/Weather");

      // Storing the weather forecast data to its global state
      setForecast(res.data);
    } catch (error) {
      console.log("Error fetching forecast data: ", error.message);
    }
  };

  // Fetch air pollution data from the Open Weather API
  const fetchAirQuality = async () => {
    try {
      // API endpoint of the get request
      const res = await axios.get("Api/Pollution");

       // Storing the air pollution data to its global state
      setAirQuality(res.data);
    } catch (error) {
      console.log("Error retrieving air quality data: ", error.message);
    }
  };

  // Fetch the five day forecast data from the Open Weather API
  const fetchFiveDayForecast = async () => {
    try {
      const res = await axios.get("Api/FiveDayForecast");

      // Storing the five day forecast data to its global state
      setDailyForecast(res.data);
    } catch (error) {
      console.log("Error fetching five day forecast data", error.message);
    }
  };

  // Fetch the UV index data from the Open meteo API
  const fetchUvIndex = async () => {
    try {
      const res = await axios.get("Api/Uv");

      // Storing the UV index data to its global state
      setUvIndex(res.data);
    } catch (error) {
      console.log("Error fetching the UV data", error.message);
    }
  };

  // Initial fetch request for all API data
  useEffect(() => {
    fetchForecast();
    fetchAirQuality();
    fetchFiveDayForecast();
    fetchUvIndex();
  }, []);

  // Sharing data with the rest of the app
  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
        dailyForecast,
        uvIndex,
      }}
    >
      <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
