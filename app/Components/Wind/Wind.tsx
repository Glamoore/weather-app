"use client";
// Imports
import React from "react";
import { useGlobalContext } from "@/app/Context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { wind } from "@/app/Utilities/Icons";

function Wind() {
  // Providing forecast data from the global context
  const { forecast } = useGlobalContext();

  // Destructuring data from the Open Weather API for use within the component
  const windSpeed = forecast?.wind?.speed;
  const windDirection = forecast?.wind?.deg;

  // Checking if wind data is available, if not return loading screen
  if (!windSpeed || !windDirection) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  // Rendering the wind data in the client if the data is available
  return (
    <div className="pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-3 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <h2 className="flex items-center gap-2 font-medium">{wind} Wind</h2>
      <div className="compass relative flex items-center justify-center">
        <div className="image relative">
          <Image
            src="Images/compass_body.svg"
            alt="compass"
            width={110}
            height={110}
          />
          <Image
            src="Images/compass_arrow.svg"
            alt="compass arrow"
            className="absolute top-0 left-[40%] transition-all duration-500 ease-in-out dark:invert"
            style={{
              transform: `rotate(${windDirection}deg) translateX(-50%)`,
              height: "100%",
            }}
            width={11}
            height={11}
          />
        </div>
        <p className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-xs dark:text-white font-medium">
          {Math.round(windSpeed)} m/s
        </p>
      </div>
    </div>
  );
}

export default Wind;
