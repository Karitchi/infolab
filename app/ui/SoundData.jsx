import { useEffect, useState } from 'react';

export default function SoundData() {
    const [soundData, setSoundData] = useState(null);

    useEffect(() => {
        // Fonction pour récupérer les données depuis l'API
        async function fetchSoundData() {
            try {
                const res = await fetch('/api/sound');
                const data = await res.json();
                setSoundData(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            }
        }

        // Appeler la fonction au chargement de la page
        fetchSoundData();
    }, []);

    return (
        <div>
            <h1>Donnees sonores</h1>
            {soundData ? (
                <div>
                    <p>Décibels: {soundData.decibels}</p>
                </div>
            ) : (
                <p>Chargement des données...</p>
            )}
        </div>
    );
}
