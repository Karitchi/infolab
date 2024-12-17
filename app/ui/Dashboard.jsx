"use client";

import { useEffect, useState } from "react";

// Fonction pour obtenir l'icône appropriée (inchangée)
const getWeatherIcon = ({ cloudcover, precipitation, temperature, snow, isDaytime, wind }) => {
  if (cloudcover < 20 && precipitation === 0) {
    return isDaytime ? "/icons/soleil.png" : "/icons/lune.png"; // Soleil/Lune clair
  }

  if (cloudcover > 70 && precipitation === 0) {
    return "/icons/nuage.png"; // Nuageux
  }

  if (cloudcover > 20 && cloudcover <= 70 && precipitation === 0) {
    return isDaytime ? "/icons/soleilNuage.png" : "/icons/luneNuage.png"; // Soleil/Lune avec Nuages
  }

  if (precipitation > 0 && precipitation <= 2) {
    if (cloudcover > 70) return "/icons/pPluie.png"; // Nuageux avec légère pluie
    return isDaytime ? "/icons/soleilPPluie.png" : "/icons/lunePPluie.png"; // Soleil/Lune et légère pluie
  }

  if (precipitation > 2 && precipitation <= 10) {
    if (cloudcover > 70) return "/icons/fPluie.png"; // Nuageux avec forte pluie
    return isDaytime ? "/icons/soleilFPluie.png" : "/icons/luneFPluie.png"; // Soleil/Lune et forte pluie
  }

  if (snow > 0) {
    return snow > 2 ? "/icons/FNeige.png" : "/icons/PNeige.png"; // Forte/Peu de neige
  }

  if (precipitation > 0 && wind > 20) {
    return isDaytime ? "/icons/soleilOrage.png" : "/icons/luneOrage.png"; // Pluie et Orage
  }

  if (wind > 30) {
    return "/icons/orage.png"; // Orage sans pluie
  }

  if (cloudcover > 50 && precipitation === 0) {
    return isDaytime ? "/icons/soleilBrouillard.png" : "/icons/luneBrouillard.png"; // Brouillard
  }

  if (wind > 10 && wind <= 20) {
    return isDaytime ? "/icons/soleilVent.png" : "/icons/luneVent.png"; // Vent léger
  }

  if (wind > 20) {
    return "/icons/fVent.png"; // Vent fort
  }

  return "/icons/default.png"; // Icône par défaut
};

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState([]); // Température extérieure
  const [dhtData, setDhtData] = useState({ temperature: null, humidity: null }); // Température et humidité intérieure
  const [mq7Data, setMq7Data] = useState({ ppm: null }); // MQ7
  const [max4466FrontData, setMax4466FrontData] = useState({ decibels: null }); // MAX4466 Front
  const [max4466BackData, setMax4466BackData] = useState({ decibels: null }); // MAX4466 Back
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const params = new URLSearchParams({
          latitude: "50.8503", // Exemple : Bruxelles
          longitude: "4.3517",
          hourly: ["temperature_2m", "cloudcover", "precipitation", "snowfall", "windspeed_10m"].join(","),
          timezone: "Europe/Berlin",
          forecast_days: 2,
        });

        const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Erreur lors de la récupération des données météo.");
        const weather = await response.json();

        const hourly = weather.hourly;

        const now = new Date();
        const currentHour = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          now.getHours(),
          0,
          0,
          0
        );

        const data = hourly.time
          .map((time, index) => ({
            time: new Date(time),
            temperature: Math.round(hourly.temperature_2m[index]),
            cloudcover: Math.round(hourly.cloudcover[index]),
            precipitation: Math.round(hourly.precipitation[index]),
            snow: Math.round(hourly.snowfall[index]),
            isDaytime: new Date(time).getHours() >= 6 && new Date(time).getHours() < 18,
            wind: Math.round(hourly.windspeed_10m[index] || 0),
          }))
          .filter((item) => item.time >= currentHour)
          .slice(0, 9);

        while (data.length < 9) {
          const lastTime = data.length > 0 ? data[data.length - 1].time : currentHour;
          data.push({
            time: new Date(lastTime.getTime() + 3600000),
            temperature: null,
            cloudcover: 0,
            precipitation: 0,
            snow: 0,
            isDaytime: true,
            wind: 0,
          });
        }

        setWeatherData(data);
      } catch (err) {
        console.error(err.message);
        setError("Erreur lors de la récupération des données météo.");
      }
    };

    const fetchDhtData = async () => {
      try {
        const response = await fetch("/api/dht11");
        if (!response.ok) throw new Error("Erreur lors de la récupération des données DHT11.");
        const data = await response.json();
        setDhtData({
          temperature: Math.round(data.temperature),
          humidity: Math.round(data.humidity),
        });
      } catch (err) {
        console.error(err.message);
      }
    };

    const fetchMq7Data = async () => {
      try {
        const response = await fetch("/api/mq7");
        if (!response.ok) throw new Error("Erreur lors de la récupération des données MQ7.");
        const data = await response.json();
        setMq7Data({ ppm: Math.round(data.ppm) });
      } catch (err) {
        console.error(err.message);
      }
    };

    const fetchMax4466FrontData = async () => {
      try {
        const response = await fetch("/api/max4466");
        if (!response.ok) throw new Error("Erreur lors de la récupération des données MAX4466 Front.");
        const data = await response.json();
        setMax4466FrontData(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    const fetchMax4466BackData = async () => {
      try {
        const response = await fetch("/api/max44661");
        if (!response.ok) throw new Error("Erreur lors de la récupération des données MAX4466 Back.");
        const data = await response.json();
        setMax4466BackData(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        fetchWeatherData(),
        fetchDhtData(),
        fetchMq7Data(),
        fetchMax4466FrontData(),
        fetchMax4466BackData(),
      ]);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <p>Chargement des données...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "90vh" }}>
      {/* Section Extérieur */}
      <section
        style={{
          flex: 1,
          color: "#FFF",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ marginBottom: "40px", textAlign: "left", fontSize: "52px" }}>Extérieur</h2>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            alignItems: "stretch",
            height: "80%",
          }}
        >
          {weatherData.map((item, index) => (
            <div
              key={index}
              style={{
                flex: index === 0 ? "2" : "1",
                textAlign: "center",
                backgroundColor: "#273c55",
                color: "#FFF",
                borderRadius: "10px",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <p style={{ marginTop: 20, fontSize: "60px" }}>
                {item.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
              <img
                src={item.temperature !== null ? getWeatherIcon(item) : "/icons/default.png"}
                alt="weather icon"
                style={{ width: "150px", height: "150px", margin: "0 auto" }}
              />
              <p style={{ marginBottom: 20, fontSize: "60px" }}>
                {item.temperature !== null ? `${item.temperature} °C` : "N/A"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section Intérieur */}
      <section
        style={{
          flex: 1,
          color: "#FFF",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ marginTop: "20px", marginBottom: "40px", textAlign: "left", fontSize: "52px" }}>
          Intérieur
        </h2>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            alignItems: "stretch",
            height: "90%",
          }}
        >
          <div
            style={{
              flex: "1",
              textAlign: "left",
              backgroundColor: "#273c55",
              color: "#FFF",
              borderRadius: "10px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "90%",
            }}
          >
            <h3 style={{ marginBottom: "auto" }}>Température</h3>
            <p style={{ alignSelf: "center", marginTop: "auto", marginBottom: "auto", fontSize: "100px" }}>
              {dhtData.temperature || "N/A"} °C
            </p>
          </div>
          <div
            style={{
              flex: "1",
              textAlign: "left",
              backgroundColor: "#273c55",
              color: "#FFF",
              borderRadius: "10px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "90%",
            }}
          >
            <h3 style={{ marginBottom: "auto" }}>Humidité</h3>
            <p style={{ alignSelf: "center", marginTop: "auto", marginBottom: "auto", fontSize: "100px" }}>
              {dhtData.humidity || "N/A"} %
            </p>
          </div>
          <div
            style={{
              flex: "1",
              textAlign: "left",
              backgroundColor: "#273c55",
              color: "#FFF",
              borderRadius: "10px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "90%",
            }}
          >
            <h3 style={{ marginBottom: "auto" }}>Carbon Monoxide</h3>
            <p style={{ alignSelf: "center", marginTop: "auto", marginBottom: "auto", fontSize: "100px" }}>
              {mq7Data.ppm || "N/A"} ppm
            </p>
          </div>
          <div
            style={{
              flex: "1",
              textAlign: "left",
              backgroundColor: "#273c55",
              color: "#FFF",
              borderRadius: "10px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "90%",
            }}
          >
            <h3 style={{ marginBottom: "auto" }}>Son de la salle avant</h3>
            <p style={{ alignSelf: "center", marginTop: "auto", marginBottom: "auto", fontSize: "100px" }}>
              {max4466FrontData.decibels || "N/A"} dB
            </p>
          </div>
          <div
            style={{
              flex: "1",
              textAlign: "left",
              backgroundColor: "#273c55",
              color: "#FFF",
              borderRadius: "10px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "90%",
            }}
          >
            <h3 style={{ marginBottom: "auto" }}>Son de la salle arrière</h3>
            <p style={{ alignSelf: "center", marginTop: "auto", marginBottom: "auto", fontSize: "100px" }}>
              {max4466BackData.decibels || "N/A"} dB
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

