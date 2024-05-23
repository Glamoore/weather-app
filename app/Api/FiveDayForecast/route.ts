import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // API key from .env
    const apiKey = process.env.OPENWEATHER_API_KEY;
    // Default longitude and latitude
    const lat = 51.5074;
    const lon = 0.1276;

    const dailyForecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    //Revalidating the five day forecast data every hour
    const dailyForecastRes = await fetch(dailyForecastURL, {
      next: { revalidate: 3600 },
    });
    // Converting data to JSON
    const dailyForecastData = await dailyForecastRes.json();

    return NextResponse.json(dailyForecastData);
  } catch (error) {
    console.log("Error receiving five day forecast data");
    return new Response("Error fetching five day forecast data", {
      status: 500,
    });
  }
}
