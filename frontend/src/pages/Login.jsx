import { useState } from "react";
import { Circle, Eye, EyeOff } from "lucide-react";
import { loginUser } from "../services/api";
import "./Login.css";

function Login({ onLogin, onOpenRegister }) {
  const [email,setEmail] = useState("");
  const [password, setPassword ] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    try {
      const result = await loginUser({
        email: email.trim(),
        password,
      });

      if(onLogin){
        onLogin(result);
      }
    }catch (error) {
      setError(error.message || "Login failed.Please try again.");
    }
  };
  
  return (
    <main className="auth-page">
      <section className="auth-card login-card">
        <div className="auth-brand">
          <span className="auth-brand-icon">
            <Circle size={17} />
          </span>
          <span>ChatApp</span>
        </div>

        <header className="auth-header">
          <h1>Welcome back</h1>
          <p>Log in to pick up your Conversations.</p> 
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="login-email">Email</label>
            <input 
              id ="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event)=> setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="login-password">Password</label>
            <div className="auth-password-wrapper">
              <input 
                id ="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event)=> setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />

              <button 
                type="button"
                className="auth-password-toggle"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((previous)=> !previous)}
              >
                {showPassword ? <EyeOff size={17}/> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button
            type="submit"
            className="auth-submit"
          >
            Log in
          </button>
        </form>

        <p className="auth-switch">
          <span>New here?</span>
          <button type="button" onClick={onOpenRegister}>
            Create an account
          </button>
        </p>
      </section>
    </main>
  );
}
export default Login;