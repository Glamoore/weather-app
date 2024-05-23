"use client";

// Imports
import React from "react";
import { useGlobalContext } from "@/app/Context/globalContext";
import { eye } from "@/app/Utilities/Icons";
import { Skeleton } from "@/components/ui/skeleton";

function Visibility() {
  // Retrieving forecast data from the global context
  const { forecast } = useGlobalContext();

  // Check if API data is available, if not return a loading screen
  if (!forecast || !forecast?.visibility) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  // Destructuring visibility from the Open Weather API
  const { visibility } = forecast;

  // Creating descriptions for the various visibility levels
  const getVisibilityDescription = (visibility: number) => {
    const visibilityInMi = Math.round(visibility * 0.0006213712);

    if (visibilityInMi > 10) return "Excellent: Clear and vast view";
    if (visibilityInMi > 5) return "Good: Easily navigable";
    if (visibilityInMi > 2) return "Moderate: Some limitations";
    if (visibilityInMi <= 2) return "Poor: Restricted and unclear";
    return "Unavailable: Visibility data not available";
  };

  // If the API data is available, render the population data in the DOM
  return (
    <div className="pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {eye} Visibility
        </h2>
        <p className="pt-3 text-2xl">{Math.round(visibility * 0.0006213712)} mi</p>
      </div>

      <p className="text-sm">{getVisibilityDescription(visibility)}.</p>
    </div>
  );
}

export default Visibility;
