"use client";

// Imports
import React from "react";
import { useGlobalContext } from "@/app/Context/globalContext";
import { droplets } from "@/app/Utilities/Icons";
import { Skeleton } from "@/components/ui/skeleton";

function Humidity() {
  // Retrieving forecast data from the global context
  const { forecast } = useGlobalContext();

  // Check if API data is available, if not return a loading screen
  if (!forecast || !forecast?.main || !forecast?.main?.humidity) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  // Destructuring  humidity from the Open Weather API
  const { humidity } = forecast?.main;

  // Creating descriptions for the various humidity levels
  const getHumidityDescription = (humidity: number) => {
    if (humidity < 30) return "Dry: May cause skin irritation";
    if (humidity >= 30 && humidity < 50)
      return "Comfortable: Ideal for health and comfort";
    if (humidity >= 50 && humidity < 70)
      return "Moderate: Sticky, may increase allergens";
    if (humidity >= 70) return "High: Uncomfortable, mold growth risk";
    return "Unavailable: Humidity data not available";
  };

  // If the API data is available, render the population data in the DOM
  return (
    <div className="pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {droplets} Humidity
        </h2>
        <p className="pt-3 text-2xl">{humidity}%</p>
      </div>

      <p className="text-sm">{getHumidityDescription(humidity)}.</p>
    </div>
  );
}

export default Humidity;
