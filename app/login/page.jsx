"use client";

import { useRouter } from "next/navigation";

// Page de connexion avec les champs nom et mot de passe
function LoginPage() {
    const router = useRouter();

    const handleLogin = (event) => {
      event.preventDefault();
      // Logique de connexion ici
        router.push("/admin");
    };

    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input type="text" style={{ color: "black" }} name="username" required />
          </label>
          <br />
          <label>
            Password:
            <input type="password" style={{ color: "black" }} name="password" required />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
}

export default LoginPage;