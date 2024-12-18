import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

// Fonction pour lire le fichier CSV
const readCsvFile = (filePath) => {
  const rows = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", () => resolve(rows))
      .on("error", (error) => reject(error));
  });
};

// Fonction principale de gestion des requêtes
export async function GET(request) {
  const stopIds = ["Bllngr01", "Bllngr02", "Bllngr03", "Bllngr04", "Bllngr05", "Bllngr06"];

  try {
    const dataDir = path.join(process.cwd(), "app/GTFS_data");

    // Charger les fichiers nécessaires
    const stopTimes = await readCsvFile(path.join(dataDir, "stop_times.txt"));
    const trips = await readCsvFile(path.join(dataDir, "trips.txt"));
    const routes = await readCsvFile(path.join(dataDir, "routes.txt"));

    // Heure actuelle
    const now = new Date();
    const currentTime = now.toTimeString().split(" ")[0];

    // Filtrer les horaires après l'heure actuelle
    let filteredStopTimes = stopTimes.filter(
      (stopTime) =>
        stopIds.includes(stopTime.stop_id) && stopTime.departure_time > currentTime
    );

    // Trier par heure de départ
    filteredStopTimes = filteredStopTimes.sort((a, b) =>
      a.departure_time.localeCompare(b.departure_time)
    );

    // Prendre uniquement les bus uniques basés sur trip_id
    const seenTrips = new Set();
    const uniqueBuses = [];

    for (const stopTime of filteredStopTimes) {
      if (!seenTrips.has(stopTime.trip_id)) {
        seenTrips.add(stopTime.trip_id);
        const trip = trips.find((t) => t.trip_id === stopTime.trip_id);
        const route = routes.find((r) => r.route_id === trip?.route_id);

        uniqueBuses.push({
          stop_id: stopTime.stop_id,
          departure_time: stopTime.departure_time,
          route_short_name: route?.route_short_name || "Inconnu",
          route_long_name: route?.route_long_name || "Inconnu",
        });
      }
      if (uniqueBuses.length >= 5) break; // Limiter à 5 résultats
    }

    return NextResponse.json(uniqueBuses);
  } catch (error) {
    console.error("Erreur lors de la lecture des fichiers :", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des horaires des bus." },
      { status: 500 }
    );
  }
}
