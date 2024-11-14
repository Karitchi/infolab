// Page de connexion avec les champs nom et mot de passe
function LoginPage() {
    const handleLogin = (event) => {
      event.preventDefault();
      // Logique de connexion ici
    };
  
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input type="text" name="username" required />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" required />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  export default LoginPage;