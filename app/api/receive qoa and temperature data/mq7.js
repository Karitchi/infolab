// pages/api/mq7.js
let ppm_CO = 0; // Stocker temporairement la dernière valeur du capteur

export default function handler(req, res) {
    if (req.method === 'POST') {
        // Stocker la valeur reçue du capteur
        ppm_CO = req.body.ppm;
        console.log("Concentration de CO reçue :", ppm_CO);
        res.status(200).json({ message: 'Données reçues avec succès' });
    } else if (req.method === 'GET') {
        // Envoyer la dernière valeur stockée
        res.status(200).json({ ppm: ppm_CO });
    } else {
        // Méthode non autorisée
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Méthode ${req.method} non autorisée`);
    }
}
