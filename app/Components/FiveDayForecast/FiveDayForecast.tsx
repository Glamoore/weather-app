"use client";

// Imports
import React from "react";
import { calender } from "@/app/Utilities/Icons";
import { useGlobalContext } from "@/app/Context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { kelvinToCelsius, unixToDay, unixToTime } from "@/app/Utilities/Misc";

// Rendering the wind data in the client if the data is available
function FiveDayForecast() {
  // Retrieving daily forecast data from the global context
  const { dailyForecast } = useGlobalContext();

  // Destructuring data from the Open Weather API
  const { city, list } = dailyForecast;

  // Check if API data is available, if not return a loading screen
  if (!dailyForecast || !city || !list) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  // Passing properties from the API and converting them for use in the DOM
  const processData = (
    dailyData: {
      main: { temp_min: number; temp_max: number };
      dt: number;
    }[]
  ) => {
    let minTemp = Number.MAX_VALUE;
    let maxTemp = Number.MIN_VALUE;

    dailyData.forEach(
      (day: { main: { temp_min: number; temp_max: number }; dt: number }) => {
        if (day.main.temp_min < minTemp) {
          minTemp = day.main.temp_min;
        }
        if (day.main.temp_max > maxTemp) {
          maxTemp = day.main.temp_max;
        }
      }
    );

    return {
      day: unixToDay(dailyData[0].dt),
      minTemp: kelvinToCelsius(minTemp),
      maxTemp: kelvinToCelsius(maxTemp),
    };
  };

  // Looping through the list items and pushing weather info for 5 days into the array
  const dailyForecasts = [];
  for (let i = 0; i < 40; i += 8) {
    const dailyData = list.slice(i, i + 5);
    dailyForecasts.push(processData(dailyData));
  }

  // If the API data is available, render the population data in the DOM
  return (
    <div
      className="pt-6 pb-5 px-4 flex-1 border rounded-lg flex flex-col
  justify-between dark:bg-dark-grey shadow-sm dark:shadow-none"
    >
      <div>
        <h2 className="flex items-center gap-2 font-medium">
          {calender} 5-Day Forecast for {city.name}
        </h2>
        <div className="forecast-list pt-3 ">
            {dailyForecasts.map((day, i) => {
                return <div key={i} className="daily-forecast py-4 flex flex-col justify-evenly border-b-2">
                    <p className="text-xl min-w-[3.5rem]">{day.day}</p>
                    <p className="text-sm flex justify-between">
                        <span>(low)</span>
                        <span>(high)</span>
                    </p>
                    <div className="flex-1 flex items-center justify-between gap-4">
                  <p className="font-bold">{day.minTemp}°C</p>
                  <div className="temperature flex-1 w-full h-2 rounded-lg"></div>
                  <p className="font-bold">{day.maxTemp}°C</p>
                </div>
                </div>
            })}
        </div>
      </div>
    </div>
  );
}

export default FiveDayForecast;
