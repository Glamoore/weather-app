"use client";
// Imports
import React from "react";
import { useGlobalContext } from "@/app/Context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { sun, sunset } from "@/app/Utilities/Icons";
import { UvProgress } from "../UvProgress/UvProgress";

function UvIndex() {
  // Retreiving UV index data from the global context
  const { uvIndex } = useGlobalContext();

  // Checking if UV index data is available, if not, will return a loading screen
  if (!uvIndex || !uvIndex.daily) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  // Destructuring data from the Open Weather API for use within the component
  const { daily } = uvIndex;
  const { uv_index_clear_sky_max, uv_index_max } = daily;

  // Removing the decimals places from the API data that is returned
  const uvIndexMax = uv_index_max[0].toFixed(0);

  //Dynamic decriptions for UV conditions
  const uvIndexCategory = (uvIndex: number) => {
    if (uvIndex <= 2) {
      return {
        text: "Low",
        protection:
          "You can safely enjoy being outside - use sunscreen SPF 15+.",
      };
    } else if (uvIndex <= 5) {
      return {
        text: "Moderate",
        protection:
          "Take precautions if you will be outside, such as wearing a hat and wearing suncreen SPF 30+.",
      };
    } else if (uvIndex <= 7) {
      return {
        text: "High",
        protection:
          "Protect yourself against sun damage - use sunscreen SPF 30+.",
      };
    } else if (uvIndex <= 10) {
      return {
        text: "Very High",
        protection: "Use sunscreen SPF 30+ and seek shade after midday.",
      };
    } else if (uvIndex > 10) {
      return {
        text: "Extreme",
        protection:
          "Use sunscreen SPF 30+ and avoid being outside between 10 am and 4 pm.",
      };
    } else {
      return {
        text: "Extreme",
        protection:
          "Protection against sun damage is essential. If possible avoid being outside.",
      };
    }
  };

  // Calculating the percentage for the UV index
  const MarginleftPercentage = (uvIndexMax / 14) * 100;

  // Rendering the UV Index data in the client if available
  return (
    <div className="pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">{sun} UV index</h2>
        <div className="pt-1 flex flex-col gap-1">
          <p className="pt-1 text-2xl">
            {uvIndexMax}
            <span className="text-sm pl-1">
              ({uvIndexCategory(uvIndexMax).text})
            </span>
          </p>

          <UvProgress
            value={MarginleftPercentage}
            max={14}
            className="progress"
          />
        </div>
      </div>
      <p className="text-xs">{uvIndexCategory(uvIndexMax).protection}</p>
    </div>
  );
}

export default UvIndex;
