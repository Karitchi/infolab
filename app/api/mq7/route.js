import { NextResponse } from "next/server";

// Données hardcodées initiales pour le capteur MQ-7
let mq7Data = { voltage: 2.5, ppm: 50 }; // Tension et concentration en PPM

// Gérer les requêtes GET et POST
export async function GET() {
  // Retourner les données actuelles
  return NextResponse.json(mq7Data, { status: 200 });
}

export async function POST(request) {
  try {
    const body = await request.json(); // Lire les données envoyées
    const { voltage, ppm } = body;

    // Vérifier que les données sont valides
    if (typeof voltage === "number" && typeof ppm === "number") {
      mq7Data = { voltage, ppm }; // Mettre à jour les données
      return NextResponse.json({ message: "Données mises à jour avec succès" }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Données invalides. Les champs 'voltage' et 'ppm' doivent être des nombres." },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur lors du traitement des données", error: error.message },
      { status: 500 }
    );
  }
}
