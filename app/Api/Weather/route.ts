import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Get request for weather forecast data from Open Weather
export async function GET(req: NextRequest) {
  try {
    // API key from .env
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    //Extracting lon & lat from user input
    const searchParamas = req.nextUrl.searchParams;

    const lat = searchParamas.get("lat");
    const lon = searchParamas.get("lon");

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await axios.get(url);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error fetching forecast data");
    return new Response("Error fetching forecast data", { status: 500 });
  }
}
