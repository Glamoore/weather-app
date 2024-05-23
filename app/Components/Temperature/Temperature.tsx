"use client"

// Imports
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '@/app/Context/globalContext';
import { kelvinToCelsius } from '@/app/Utilities/Misc';
import { clearSky, cloudy, drizzleIcon, navigation, rain, snow, thunderstorm } from '@/app/Utilities/Icons';
import moment from 'moment';

function Temperature() {
    // Providing forecast data from the global context
    const { forecast } = useGlobalContext();

    // Destructuring data from the Open Weather API for use within the component
    const { main, timezone, name, weather } = forecast;

    // Checking if weather forecast data is available, if not return loading screen 
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

// Weather condition icons imported from Lucide react within Icon/Utilities
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

  //Dynamic time update via Moment
  useEffect(() => {
    //Update time every second
    const interval = setInterval(() => {}, 1000);
    const localMoment = moment().utcOffset(timezone / 60);
    //Custom time format:  24 hour format
    const formattedTime = localMoment.format("h:mm a");
    // Day of the week
    const day = localMoment.format("dddd");

    // Updating states for time and date with live data
    setLocalTime(formattedTime);
    setCurrentDay(day);
  }, []);


  // Rendering the weather forecast data in the client if the data is available
  return (
    <div className="pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none">
        <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1">
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{temp}°</p>
      <div>
        <span>{getIcon()}</span>
        <p className="pt-2 capitalize text-lg font-medium">{description}</p>
      </div>
      <p className="flex items-center gap-3">
        <span>
          Low: <strong>{minTemp}°</strong>
        </span>
        <span>
          High: <strong>{maxTemp}°</strong>
        </span>
      </p>
    </div>
  )
}

export default Temperature