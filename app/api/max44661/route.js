import { NextResponse } from "next/server";

let soundData = { decibels: null }; // Variable pour stocker les dernières données reçues

// Route GET pour récupérer les données du MAX4466
export async function GET() {
  // Retourner les dernières données reçues
  return NextResponse.json(soundData, { status: 200 });
}

// Route POST pour recevoir et stocker les données du MAX4466
export async function POST(request) {
  try {
    const body = await request.json(); // Lire les données envoyées
    const { decibels } = body;

    // Vérifier si les données sont valides
    if (decibels != null && decibels >= 0) {
      // Mettre à jour les données si elles sont valides
      soundData = { decibels };
      return NextResponse.json(
        { message: "Données mises à jour avec succès" },
        { status: 200 },
      );
    } else {
      // Ignorer les données invalides et conserver les précédentes
      return NextResponse.json(
        { message: "Données invalides ignorées" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Erreur lors du traitement des données :", error);
    return NextResponse.json(
      {
        message: "Erreur lors du traitement des données",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
