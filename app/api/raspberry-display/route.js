import { fetchComponentVisibility } from "@/app/lib/serverActionVisibility";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const visibilityData = await fetchComponentVisibility();
    return NextResponse.json(visibilityData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des données de visibilité." },
      { status: 500 },
    );
  }
}
