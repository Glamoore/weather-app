import { NextRequest, NextResponse } from "next/server";

// Get request for UV data from Open Meteo
export async function GET(req: NextRequest) {
  try {

     //Extracting lon & lat from user input
     const searchParamas = req.nextUrl.searchParams;

     const lat = searchParamas.get("lat");
     const lon = searchParamas.get("lon");

    const uvUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

    const res = await fetch(uvUrl, {
      next: { revalidate: 900 },
    });

    const uvData = await res.json();

    return NextResponse.json(uvData);
  } catch (error) {
    console.log("Error getting UV data");

    return new Response("Error getting UV data", { status: 500 });
  }
}
