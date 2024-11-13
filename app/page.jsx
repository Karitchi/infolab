import Slideshow from "./ui/Slideshow";
import { testDbConnection } from "./lib/database";
import { useEffect, useState } from 'react';

// testDbConnection();

const Page = () => {
  return <Slideshow />;
};

export default function Home() {
    const [ppm, setPpm] = useState(null);

    useEffect(() => {
        // Fonction pour récupérer les données toutes les 2 secondes
        const interval = setInterval(() => {
            fetch('/api/mq7')
                .then((response) => response.json())
                .then((data) => setPpm(data.ppm))
                .catch((error) => console.error("Erreur :", error));
        }, 2000);

        return () => clearInterval(interval); // Nettoyage de l'interval
    }, []);

    return (
        <div>
            <h1>Concentration de CO en temps réel</h1>
            <p>{ppm !== null ? `${ppm.toFixed(2)} ppm` : "Chargement..."}</p>
        </div>
    );
}

export default Page;
