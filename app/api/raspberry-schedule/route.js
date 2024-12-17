import { getSchedule } from "@/app/lib/serverActionEndpoint";
import { NextResponse } from "next/server";

// accept only get request and give our raspberry the day and hours for eache days data from the data base
export async function GET() {
  try {
    const scheduleData = await getSchedule();
    return NextResponse.json(scheduleData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des horaires." },
      { status: 500 },
    );
  }
}
