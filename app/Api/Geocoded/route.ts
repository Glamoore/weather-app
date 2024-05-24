import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // API key from .env
  const apiKey = process.env.OPENWEATHER_API_KEY;

  const searchParamas = req.nextUrl.searchParams;

  const city = searchParamas.get("search");

  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

  //Fetching data
  const res = await axios.get(url);

  return NextResponse.json(res.data);

  try {
  } catch (error) {
    console.log("Error fetching geocoded data");
    return new Response("Error fetching geocoded data", { status: 500 });
  }
}
