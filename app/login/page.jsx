"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";

function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        if (!email.includes("@") || password.length < 8) {
            setError("Email ou mot de passe invalide");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.post(`/api/login`, { email, password });
            if (response.status === 200) {
                localStorage.setItem("auth_token", response.data.auth_token);
                router.push("/admin");
            } else {
                setError(response.data.error);
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.error || "Erreur interne du serveur");
            } else if (err.request) {
                setError("Impossible de contacter le serveur. Vérifiez votre connexion.");
            } else {
                setError("Une erreur inattendue s'est produite.");
            }
        } finally {
            setTimeout(() => setLoading(false), 1000); // Ajout du délai de 1 seconde
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <fieldset disabled={loading}>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        style={{ color: "black" }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        style={{ color: "black" }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br />
                    <button type="submit">
                        {loading ? "Loading..." : "Login"}
                    </button>
                </fieldset>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}

export default LoginPage;
