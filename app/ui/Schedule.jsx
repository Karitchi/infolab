import { useState, useEffect } from "react";

export default Schedule => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Requête vers notre API locale pour obtenir les horaires des 3 prochains trains
    fetch(`/api/train-schedule?station_id=BE.NMBS.008814001`) // Exemple : Bruxelles-Midi
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des horaires");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Données API :", data);
        setTrains(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Chargement des horaires...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Horaires des 3 prochains trains</h1>
      {trains.length > 0 ? (
        <ul>
          {trains.map((train, index) => (
            <li key={index}>
              <strong>Destination:</strong> {train.destination} <br />
              <strong>Heure de départ:</strong> {train.departureTime} <br />
              <strong>Quai:</strong> {train.platform} <br />
              <strong>Train:</strong> {train.vehicle}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun train disponible.</p>
      )}
    </div>
  );
};