import { useState, useEffect } from "react";

const DHTSensor = () => {
  const [sensorData, setSensorData] = useState(null); // Stocker les données du capteur
  const [loading, setLoading] = useState(true); // Gérer le chargement
  const [error, setError] = useState(null); // Gérer les erreurs

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Requête API démarrée...");
        const response = await fetch(`/api/dht11`);

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données du capteur");
        }

        const data = await response.json();
        console.log("Données reçues :", data);

        setSensorData(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur dans le fetch :", error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    // Récupérer les données à l'initialisation et toutes les 5 secondes
    fetchData();
    const interval = setInterval(fetchData, 5000); // Rafraîchir toutes les 5 secondes

    return () => clearInterval(interval); // Nettoyer l'intervalle lors du démontage
  }, []); // Exécuté une fois au montage

  if (loading) {
    return <p>Chargement des données du capteur...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  return (
    <div>
      <h1>Données du capteur DHT11</h1>
      {sensorData ? (
        <div>
          <p><strong>Température :</strong> {sensorData.temperature} °C</p>
          <p><strong>Humidité :</strong> {sensorData.humidity} %</p>
        </div>
      ) : (
        <p>Aucune donnée disponible.</p>
      )}
    </div>
  );
};

export default DHTSensor;
