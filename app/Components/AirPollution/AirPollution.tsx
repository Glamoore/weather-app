"use client";

// Imports
import React from "react";
import { useGlobalContext } from "@/app/Context/globalContext";
import { thermo } from "@/app/Utilities/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { airQualityInfo } from "@/app/Utilities/Misc";

function AirPollution() {
  // Retreiving air pollution data from the global context
  const { airQuality } = useGlobalContext();

  // Retrieving forecast data from the global context
  const { forecast } = useGlobalContext();
  const { name } = forecast;

  // Check if air quality data is available, if not return loading screen
  if (
    !airQuality ||
    !airQuality.list ||
    !airQuality.list[0] ||
    !airQuality.list[0].main
  ) {
    return (
      <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
    );
  }

  // Calculating air quality index
  const airQualityIndex = airQuality.list[0].main.aqi * 10;

  // Matching air quality index to description
  const filteredAirQualityIndex = airQualityInfo.find((item) => {
    return item.rating === airQualityIndex;
  });

  // Rendering the air pollution data in the client if the data is available
  return (
    <div
      className="air-pollution pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8
    dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2"
    >
      <h2 className="flex items-center gap-2 font-medium">
        {thermo} Air Pollution
      </h2>
      <Progress value={airQualityIndex} max={10} className="progress" />
      <p className="text-sm">
        Air quality in {name} is {filteredAirQualityIndex?.description}.
      </p>
    </div>
  );
}

export default AirPollution;
