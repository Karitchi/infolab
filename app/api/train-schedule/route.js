import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const stationId = searchParams.get("station_id") || "BE.NMBS.008814001"; // Exemple : Bruxelles-Midi
  const apiUrl = `https://api.irail.be/liveboard/?id=${stationId}&format=json&arrdep=departure`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.departures || !data.departures.departure) {
      return NextResponse.json(
        { message: "Aucun départ trouvé." },
        { status: 404 },
      );
    }

    // Limiter aux 3 prochains départs
    const nextTrains = data.departures.departure.slice(0, 3).map((train) => ({
      destination: train.station,
      departureTime: new Date(train.time * 1000).toLocaleTimeString(),
      platform: train.platform,
      vehicle: train.vehicleinfo.shortname,
    }));

    return NextResponse.json(nextTrains, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des horaires:", error);
    return NextResponse.json(
      { message: "Erreur lors de la récupération des horaires." },
      { status: 500 },
    );
  }
}
