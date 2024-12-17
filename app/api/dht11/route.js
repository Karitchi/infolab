import { NextResponse } from "next/server";

let sensorData = { temperature: null, humidity: null }; // Stockage des données

export async function GET() {
  // Retourner les données actuelles
  return NextResponse.json(sensorData, { status: 200 });
}

export async function POST(request) {
  try {
    const body = await request.json(); // Lire les données envoyées
    const { temperature, humidity } = body;

    // Vérifier si les données sont valides (non nulles et numériques)
    if (
      temperature &&
      humidity &&
      !isNaN(Number(temperature)) &&
      !isNaN(Number(humidity))
    ) {
      // Mettre à jour les données si elles sont valides
      sensorData = {
        temperature: Number(temperature),
        humidity: Number(humidity),
      };
      return NextResponse.json(
        { message: "Données reçues avec succès" },
        { status: 200 },
      );
    } else {
      // Ignorer les données invalides
      console.log("Données invalides :", body);
      return NextResponse.json(
        { message: "Données invalides ignorées" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Erreur lors du traitement des données :", error);
    return NextResponse.json(
      { message: "Erreur interne", error: error.message },
      { status: 500 },
    );
  }
}
