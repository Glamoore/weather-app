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

  // Using axios get request to retrieve the weather forecast data from Open Weather on initial render
  const fetchForecast = async () => {
    try {
      // API endpoint of the get request
      const res = await axios.get("Api/Weather");

      // Storing weather forecast data to global state
      setForecast(res.data);
    } catch (error) {
      console.log("Error fetching forecast data: ", error.message);
    }
  };

  // Using axios get request to retrieve the air pollution data from Open Weather on initial render
  const fetchAirQuality = async () => {
    try {
      // API endpoint of the get request
      const res = await axios.get("Api/Pollution");

      // Storing air pollution data to global state
      setAirQuality(res.data);
    } catch (error) {
      console.log("Error retrieving air quality data: ", error.message);
    }
  };

  // Using axios get request to retrieve the five day forecast data from Open Weather on initial render

  const fetchFiveDayForecast = async () => {
    try {
      const res = await axios.get("Api/FiveDayForecast");

      console.log("Five Day Forecast", res.data);
      setDailyForecast(res.data);
    } catch (error) {
      console.log("Error fetching five day forecast data", error.message);
    }
  };

  // Fetching data
  useEffect(() => {
    fetchForecast();
    fetchAirQuality();
    fetchFiveDayForecast();
  }, []);

  // Sharing data with the rest of the app
  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
        dailyForecast,
      }}
    >
      <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
