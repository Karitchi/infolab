// Importation des librairies nécessaires
import { NextApiRequest, NextApiResponse } from 'next';

// Fonction pour traiter la requête POST
export default async function handler(req, res) {
    // Vérification que la méthode est POST
    if (req.method === 'POST') {
        try {
            // Récupération des données envoyées dans le corps de la requête
            const { decibels } = req.body;

            // Affichage des données dans la console pour le débogage
            console.log('Données reçues:', { decibels });

            // Vous pouvez maintenant utiliser ces données, par exemple les enregistrer dans une base de données
            // ou effectuer d'autres traitements selon les besoins.

            // Réponse au client
            res.status(200).json({ message: 'Données reçues avec succès' });
        } catch (error) {
            // En cas d'erreur, renvoyer une erreur au client
            res.status(500).json({ message: 'Erreur interne du serveur', error });
        }
    } else {
        // Si la méthode n'est pas POST, renvoyer une erreur 405 (Méthode non autorisée)
        res.status(405).json({ message: 'Méthode non autorisée' });
    }
}
