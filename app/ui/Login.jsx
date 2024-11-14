
// Page de connexion avec les champs nom et mot de passe
function LoginPage() {
    const handleLogin = (event) => {
      event.preventDefault();
      // Logique de connexion ici
    };
  
    return (
      <div>
        <h2>Page de connexion</h2>
        <form onSubmit={handleLogin}>
          <label>
            Nom d'utilisateur:
            <input type="text" name="username" required />
          </label>
          <br />
          <label>
            Mot de passe:
            <input type="password" name="password" required />
          </label>
          <br />
          <button type="submit">Se connecter</button>
        </form>
      </div>
    );
  }

  export default LoginPage;