import { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from 'next/image';

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour obtenir l'icône météo appropriée
  const getWeatherIcon = (conditions) => {
    const {
      cloudcover,
      precipitation,
      snow,
      temperature,
      time,
      sunrise,
      sunset,
      thunderstorm,
    } = conditions;

    // Convertir les heures de lever et coucher du soleil en objets Date
    const currentTime = new Date(time);
    const sunriseTime = new Date(sunrise);
    const sunsetTime = new Date(sunset);

    const isDayTime = currentTime >= sunriseTime && currentTime < sunsetTime; // Vrai si c'est le jour

    // Conditions pour le jour
    if (isDayTime) {
      if (snow > 0) {
        return "/icons/neige.png"; // Icône neige
      } else if (thunderstorm) {
        return "/icons/orage.png"; // Icône orage
      } else if (precipitation > 0) {
        return "/icons/pluie.png"; // Icône pluie + nuages
      } else if (cloudcover > 50) {
        return "/icons/nuage.png"; // Icône nuages
      } else if (temperature < 15) {
        return "/icons/soleil_couvert.png"; // Icône soleil + nuages (froid)
      } else {
        return "/icons/soleil.png"; // Icône soleil (chaud)
      }
    }

    // Conditions pour la nuit
    else {
      if (snow > 0) {
        return "/icons/neige.png"; // Icône neige
      } else if (thunderstorm) {
        return "/icons/orage.png"; // Icône orage
      } else if (precipitation > 0) {
        return "/icons/pluie.png"; // Icône pluie + nuages
      } else if (cloudcover > 50) {
        return "/icons/nuage.png"; // Icône nuages (nuit)
      } else if (temperature < 10) {
        return "/icons/lune_couvert.png"; // Icône nuages + lune (froid)
      } else {
        return "/icons/Nuit.png"; // Icône lune (chaud)
      }
    }
  };

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, errorHandler);
      } else {
        setError("La géolocalisation n'est pas supportée par ce navigateur.");
      }
    };

    const success = async (position) => {
      const { latitude, longitude } = position.coords;
      const params = new URLSearchParams({
        latitude: latitude,
        longitude: longitude,
        hourly: [
          "temperature_2m", // Température
          "precipitation", // Précipitations (pluie)
          "cloudcover", // Couverture nuageuse
        ].join(","),
        timezone: "Europe/Berlin",
        forecast_days: 1,
      });

      const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

      try {
        const response = await fetch(url);
        const weatherData = await response.json();

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données.");
        }

        const hourly = weatherData.hourly;

        const timeValues = Array.from(
          { length: hourly.time.length },
          (_, i) => new Date(hourly.time[i]),
        );

        const temperatureValues = hourly.temperature_2m;
        const precipitationValues = hourly.precipitation;
        const cloudcoverValues = hourly.cloudcover;

        const data = timeValues.map((time, index) => ({
          time,
          temperature: Math.round(temperatureValues[index]),
          precipitation: precipitationValues[index], // Précipitations
          cloudcover: cloudcoverValues[index], // Couverture nuageuse
        }));

        setWeatherData(data);
      } catch (err) {
        console.error(
          "Erreur lors de la récupération des données météo : ",
          err,
        );
        setError("Erreur lors du chargement des données météo.");
      } finally {
        setLoading(false);
      }
    };

    const errorHandler = (err) => {
      console.error("Erreur de géolocalisation: ", err.message);
      setError("Erreur lors de la récupération de la géolocalisation.");
      setLoading(false);
    };

    getLocation();
  }, []);

  return (
    <div>
      
      <div className="bg-gray-800 text-white fixed w-full left-0">
        <div
          className="flex justify-center items-center h-16"
          style={{ backgroundColor: "#B8CDAB" }}
        >
          <div className="text-3xl font-bold" style={{ color: "#4E4E4E" }}>
            OpenLab
          </div>
        </div>
      </div>
      <section
        className="exterior-weather"
        style={{
          width: "100vw",
          height: "500px",
          backgroundColor: "#4E4E4E",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h2 className="section-title">Exterior</h2>
        {loading && <p>Chargement des données météo...</p>}
        {error && <p>{error}</p>}
        {weatherData && (
          <Splide
            options={{
              type: "loop",
              perPage: 4,
              autoplay: true,
              gap: "1rem",
              width: "100%", // Carrousel occupe toute la largeur
              arrows: true,
              pagination: true,
              display: "flex", // Utilisation de flexbox
              flexDirection: "column", // Pour empiler les éléments verticalement
              justifyContent: "center", // Centrage vertical
              alignItems: "center",
            }}
          >
            {weatherData.map((item, index) => (
              <SplideSlide
                key={index}
                style={{
                  textAlign: "center",
                  padding: "15px",
                  backgroundColor: "#273c55",
                  borderRadius: "10px",
                  marginTop: "50px",
                  backgroundColor: "#B8CDAB",
                  display: "flex", // Utilisation de flexbox
                  flexDirection: "column", // Pour empiler les éléments verticalement
                  justifyContent: "center", // Centrage vertical
                  alignItems: "center", // Centrage horizontal
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    marginBottom: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {item.time.toLocaleDateString()}{" "}
                  {item.time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <Image
                  style={{
                    width: "50px",
                    height: "50px",
                    marginBottom: "10px",
                  }}
                  src={getWeatherIcon(item)}
                  alt="weather icon"
                  width={50}
                  height={50}
                />
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    alignItems: "center",
                  }}
                >
                  {item.temperature}°C
                </p>
              </SplideSlide>
            ))}
          </Splide>
        )}
      </section>
    </div>
  );
}
