"use client";
// Imports
import React from "react";
import { useGlobalContext } from "@/app/Context/globalContext";
import { gauge } from "@/app/Utilities/Icons";
import { Skeleton } from "@/components/ui/skeleton";

function Pressure() {
  // Retrieving forecast data from the global context
  const { forecast } = useGlobalContext();

  // Check if API data is available, if not return a loading screen
  if (!forecast || !forecast?.main || forecast?.main?.Pressure) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  // Destructuring pressure from the Open Weather API
  const { pressure } = forecast?.main;

  // Creating descriptions for the various pressure levels
  const getPressureDescription = (pressure: number) => {
    if (pressure < 1000) return "Very low pressure";

    if (pressure >= 1000 && pressure < 1015)
      return "Low pressure. Expect weather changes.";

    if (pressure >= 1015 && pressure < 1025)
      return "Normal pressure. Expect weather changes.";

    if (pressure >= 1025 && pressure < 1040)
      return "High pressure. Expect weather changes.";

    if (pressure >= 1040) return "Very high pressure. Expect weather changes.";

    return "Unavailable pressure data";
  };

  // If the API data is available, render the population data in the DOM
  return (
    <div className="pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {gauge} Pressure
        </h2>
        <p className="pt-3 text-2xl">{pressure} hPa</p>
      </div>
      <p className="text-sm">{getPressureDescription(pressure)}</p>
    </div>
  );
}

export default Pressure;
