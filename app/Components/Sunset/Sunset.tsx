"use client";

// Imports
import React from "react";
import { useGlobalContext } from "@/app/Context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { unixToTime } from "@/app/Utilities/Misc";
import { sunrise, sunset } from "@/app/Utilities/Icons";

function Sunset() {
  // Retreiving forecast data from the global context
  const { forecast } = useGlobalContext();

  // Check if API data is available, if not return a loading screen
  if (!forecast || !forecast?.sys) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  // Retrieving sunset times and timezone for the location from Open Weather API via the Global Context
  const times = forecast?.sys?.sunset;
  const timezone = forecast?.timezone;

  // Destructuring data from the Open Weather API for use within the component
  const sunsetTime = unixToTime(times, timezone);
  const sunRiseTime = unixToTime(forecast?.sys?.sunrise, timezone);

  // If the API data is available, render the sunsetn & sunrise data in the DOM
  return (
    <div className="pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">{sunset} Sunset</h2>
        <p className="pt-4 text-2xl">{sunsetTime}</p>
      </div>
      <p className="text-sm">
        {sunrise} Sunrise: {sunRiseTime}
      </p>
    </div>
  );
}

export default Sunset;
