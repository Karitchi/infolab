import { Pool } from "pg";
// import bcrypt from "bcrypt";
import { NextResponse } from 'next/server'; // Pour manipuler la réponse

// Configuration de la connexion à la base de données PostgreSQL
const pool = new Pool({
    user: "infolab",
    host: "localhost",
    database: "infolab",
    password: "infolab",
    port: 5432, // Port par défaut de PostgreSQL
});

// Gérer les requêtes POST
export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 });
        }

        // Vérification utilisateur dans la base de données
        const user = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (user.rowCount === 0) {
            return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 401 });
        }

        // Exemple : générer un token d'authentification
        const authToken = 'dummy_token'; // Remplacez par votre logique de token

        return NextResponse.json(
            { message: 'Connexion réussie', auth_token: authToken },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erreur dans l\'API login:', error);
        return NextResponse.json(
            { error: 'Erreur interne du serveur' },
            { status: 500 }
        );
    }
}
