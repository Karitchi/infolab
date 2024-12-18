import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Pool } from "pg";

// Configuration de la base de données
const pool = new Pool({
  user: "infolab",
  host: "localhost",
  database: "infolab",
  password: "infolab",
  port: 5432,
});

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Vérifier si l'e-mail existe dans la base de données
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 });
    }

    const user = result.rows[0];

    // Comparer le mot de passe saisi avec celui haché dans la base de données
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Mot de passe incorrect" }, { status: 401 });
    }

    // Connexion réussie
    return NextResponse.json({ message: "Connexion réussie", role: user.role });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
  }
}