"use client"; // Pour rendre ce composant côté client

import { useState, useEffect } from "react";

const MQSensor = () => {
  const [sensorData, setSensorData] = useState(null); // Stocker les données du capteur
  const [loading, setLoading] = useState(true); // Gérer le chargement
  const [error, setError] = useState(null); // Gérer les erreurs

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/mq7`); // Requête vers l'API MQ-7
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données du capteur MQ-7");
        }
        const data = await response.json();
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
    return <p>Chargement des données du capteur MQ-7...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  return (
    <div>
      <h1>Données du capteur MQ-7</h1>
      {sensorData ? (
        <div>
          <p><strong>Tension :</strong> {sensorData.voltage} V</p>
          <p><strong>Concentration (PPM) :</strong> {sensorData.ppm} ppm</p>
        </div>
      ) : (
        <p>Aucune donnée disponible.</p>
      )}
    </div>
  );
};

export default MQSensor;
