"use client";

//Imports
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  // Creatung a state to hold the weather forecast data from the Open Weather API for global use
  const [forecast, setForecast] = useState({});

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

  // Fetching data
  useEffect(() => {
    fetchForecast();
  }, []);

  // Sharing data with the rest of the app
  return (
    <GlobalContext.Provider
      value={{
        forecast,
      }}
    >
      <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);