import { Pool } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from 'next/server';

const pool = new Pool({
    user: "infolab",
    host: "localhost",
    database: "infolab",
    password: "infolab",
    port: 5432,
});

export async function POST(request) {
    try {
        const body = await request.json();
        let { email, password } = body;
        email = 'dummy@example.com';
        password = 'dummy_password';

        if (!email || !password) {
            return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 });
        }

        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rowCount === 0) {
            return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 });
        }

        const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!isValidPassword) {
            return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 });
        }

        const authToken = jwt.sign(
            { userId: user.rows[0].id },
            'your_secret_key',
            { expiresIn: '1h' }
        );

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
