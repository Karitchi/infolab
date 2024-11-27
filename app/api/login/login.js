import { Pool } from "pg";
import bcrypt from "bcrypt";

// Configuration de la connexion à la base de données PostgreSQL
const pool = new Pool({
    user: "infolab",
    host: "localhost", // Assurez-vous que c'est correct pour votre environnement
    database: "infolab",
    password: "infolab",
    port: 5432, // Port par défaut de PostgreSQL
});

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Méthode non autorisée" });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email et mot de passe requis" });
    }

    try {
        // Requête SQL pour trouver un utilisateur par email
        const query = "SELECT * FROM users WHERE email = $1";
        const result = await pool.query(query, [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Utilisateur non trouvé" });
        }

        const user = result.rows[0];

        // Vérifier le mot de passe
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        let isPasswordValid = false
        if (password === user.password){
            isPasswordValid = true
        }
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
        }

        // Générer des tokens fictifs (à remplacer par JWT pour une vraie application)
        const auth_token = "dummy_auth_token"; // Remplacez par une implémentation JWT
        const refresh_auth_token = "dummy_refresh_token";

        return res.status(200).json({ auth_token, refresh_auth_token });
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        return res.status(500).json({ error: "Erreur interne du serveur" });
    }
}
