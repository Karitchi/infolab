"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [trains, setTrains] = useState([]);
  const [buses, setBuses] = useState([]);
  const [loadingTrains, setLoadingTrains] = useState(true);
  const [loadingBuses, setLoadingBuses] = useState(true);
  const [errorTrains, setErrorTrains] = useState(null);
  const [errorBuses, setErrorBuses] = useState(null);

  // Fonction pour mapper les stop_id aux numéros de quai
  const mapStopIdToPlatform = (stopId) => {
    const stopMap = {
      Bllngr01: 1,
      Bllngr02: 2,
      Bllngr03: 3,
      Bllngr04: 4,
      Bllngr05: 5,
      Bllngr06: 6,
    };
    return stopMap[stopId] || "Inconnu";
  };

  useEffect(() => {
    // Requête pour les horaires des trains
    fetch(`/api/train-schedule?station_id=BE.NMBS.008811676`)
      .then((response) => {
        if (!response.ok) throw new Error("Erreur lors de la récupération des horaires des trains");
        return response.json();
      })
      .then((data) => {
        setTrains(data.slice(0, 5)); // Limite aux 5 prochains trains
        setLoadingTrains(false);
      })
      .catch((error) => {
        setErrorTrains(error.message);
        setLoadingTrains(false);
      });

    // Requête pour les horaires des bus
    fetch(`/api/bus-schedule`)
      .then((response) => {
        if (!response.ok) throw new Error("Erreur lors de la récupération des horaires des bus");
        return response.json();
      })
      .then((data) => {
        setBuses(data.slice(0, 5));
        setLoadingBuses(false);
      })
      .catch((error) => {
        setErrorBuses(error.message);
        setLoadingBuses(false);
      });
  }, []);

  return (
    <div className="bg-transparent min-h-screen text-white p-8">
      {/* Titre principal */}
      <h1 className="text-5xl font-bold mb-8 text-left">Depart</h1>

      {/* Conteneur des deux colonnes */}
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Colonne des trains */}
        <div
          className="w-full md:w-1/2 rounded-lg p-6 text-white shadow-lg"
          style={{ backgroundColor: "#273c55" }}
        >
          {/* Logo train */}
          <div className="flex justify-center mb-4">
            <img src="/icons/train.png" alt="Train" className="w-20 h-20" />
          </div>
          <div>
            {loadingTrains ? (
              <p className="text-center">Chargement des horaires des trains...</p>
            ) : errorTrains ? (
              <p className="text-center">{errorTrains}</p>
            ) : (
              trains.map((train, index) => (
                <div key={index} className="border-b py-4">
                  {/* Première ligne : Destination à gauche, Numéro du train à droite */}
                  <div className="flex justify-between">
                    <p className="text-3xl font-bold">{train.destination}</p>
                    <p className="text-3xl font-bold">{train.vehicle}</p>
                  </div>
                  {/* Deuxième ligne : Heure à gauche, Voie à droite */}
                  <div className="flex justify-between text-2xl mt-2">
                    <p>{train.departureTime}</p>
                    <p>Voie {train.platform}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Colonne des bus */}
        <div
          className="w-full md:w-1/2 rounded-lg p-6 text-white shadow-lg"
          style={{ backgroundColor: "#273c55" }}
        >
          {/* Logo bus */}
          <div className="flex justify-center mb-4">
            <img src="/icons/bus.png" alt="Bus" className="w-24 h-24" />
          </div>
          <div>
            {loadingBuses ? (
              <p className="text-center">Chargement des horaires des bus...</p>
            ) : errorBuses ? (
              <p className="text-center">{errorBuses}</p>
            ) : (
              buses.map((bus, index) => (
                <div key={index} className="border-b py-4">
                  {/* Première ligne : Destination à gauche, Ligne à droite */}
                  <div className="flex justify-between">
                    <p className="text-3xl font-bold">{bus.route_long_name}</p>
                    <p className="text-3xl font-bold">{bus.route_short_name}</p>
                  </div>
                  {/* Deuxième ligne : Heure à gauche, Quai à droite */}
                  <div className="flex justify-between text-2xl mt-2">
                    <p>{bus.departure_time}</p>
                    <p>Quai {mapStopIdToPlatform(bus.stop_id)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
