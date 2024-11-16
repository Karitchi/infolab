"use client";

import Slideshow from "./ui/Slideshow";
//import { testDbConnection } from "./lib/database";
import { useEffect, useState } from 'react';

const Home = () => {
    const [ppm, setPpm] = useState(null);

    useEffect(() => {
        // Fonction pour récupérer les données toutes les 2 secondes
        const interval = setInterval(() => {
            fetch('http://localhost:3000/api/qoa-temperature/mq7')  // Utilise l'URL complète si nécessaire
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Erreur réseau lors de la récupération des données");
                    }
                    return response.json();
                })
                .then((data) => setPpm(data.ppm))
                .catch((error) => console.error("Erreur :", error));
        }, 2000);

        return () => clearInterval(interval); // Nettoyage de l'interval
    }, []);

    return (
        <div>
            <Slideshow />
            <h1>Concentration de CO en temps réel</h1>
            <p>{ppm !== null ? `${ppm.toFixed(2)} ppm` : "Chargement..."}</p>
        </div>
    );
}

export default Home;
