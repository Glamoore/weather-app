"use client";
// Imports
import React from "react";
import { useGlobalContext } from "@/app/Context/globalContext";
import { people } from "@/app/Utilities/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/app/Utilities/Misc";

function Population() {
  // Retrieving forecast data from the global context
  const { dailyForecast } = useGlobalContext();
  const { city } = dailyForecast;

  // Check if API data is available, if not return a loading screen
  if (!dailyForecast || !city) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  // If the API data is available, render the population data in the DOM
  return (
    <div className="pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {people} Population
        </h2>
        <p className="pt-4 text-2xl">{formatNumber(city.population)}</p>
      </div>
      <p className="text-sm">Latest UN population data for {city.name}</p>
    </div>
  );
}

export default Population;
