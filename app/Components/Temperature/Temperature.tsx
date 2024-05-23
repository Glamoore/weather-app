"use client"

// Imports
import React, { useState } from 'react'
import { useGlobalContext } from '@/app/Context/globalContext';
import { kelvinToCelsius } from '@/app/Utilities/Misc';
import { clearSky, cloudy, drizzleIcon, rain, snow, thunderstorm } from '@/app/Utilities/Icons';

function Temperature() {
    // Providing forecast data from the global context
    const { forecast } = useGlobalContext();

    // Destructuring data from the Open Weather API for use within the component
    const { main, timezone, name, weather } = forecast;

    // Check if weather forecast data is available, if not return loading screen 
  if (!forecast || !weather) {
    return <div>Loading...</div>;
  }

  // Converting kelvin to celsuis for the client.
  const temp = kelvinToCelsius(main?.temp);
  const minTemp = kelvinToCelsius(main?.temp_min);
  const maxTemp = kelvinToCelsius(main?.temp_max);

// State to store current time and day
const [localTime, setLocalTime] = useState<string>("");
const [currentDay, setCurrentDay] = useState<string>("");

// Descructuring forecast data for use
const { main: weatherMain, description } = weather[0];

//Weather condition icon imported from Lucide react within Icon/Utilities
const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      case "Thunderstorm":
        return thunderstorm;
      default:
        return clearSky;
    }
  };

  // Rendering the weather forecast data in the client if the data is available
  return (
    <div className="pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none">
        <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
    </div>
  )
}

export default Temperature