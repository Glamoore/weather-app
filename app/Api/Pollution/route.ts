import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Get request for pollution data from Open Weather
export async function GET(req: NextRequest) {
  try {
    // API key from .env
    const apiKey = process.env.OPENWEATHER_API_KEY;

    // Default longitude and latitude
    const lat = 40.7128;
    const lon = -74.006;

    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await axios.get(url);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error receiving pollution data");
    return new Response("Error fetching pollution data", { status: 500 });
  }
}
