"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";

function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState(""); // Ajouté pour capturer l'email
    const [password, setPassword] = useState(""); // Ajouté pour capturer le mot de passe
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        setError("");

        try {
            const response = await axios.post(`/api/login`, {
                email,
                password,
            });
            if (response.status === 200) {
                console.log(response.data);
                localStorage.setItem("auth_token", response.data.auth_token);
                localStorage.setItem("refresh_auth_token", response.data.refresh_auth_token);
                router.push("/admin");
                window.location.reload();
            } else {
                setError(response.data.error);
            }
        } catch (err) {
            console.error("Erreur de connexion :", err);
            setError("Une erreur s'est produite lors de la connexion");
        } finally {
            setTimeout(() => setLoading(false), 2000);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        style={{ color: "black" }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        style={{ color: "black" }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}

export default LoginPage;
