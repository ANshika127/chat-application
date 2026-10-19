import { useState } from "react";
import { Circle, Eye, EyeOff } from "lucide-react";

import { registerUser } from "../services/api";
import "./Register.css";
import "./Login.css";

function Register({ onRegister , onOpenLogin }){
  const [name , setName] = useState("");
  const [ username,setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) =>{
    event.preventDefault();
    if (
      !name.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password
    ){
      setError("Please fill in all required fields.");
      return;
    }
    setError("");

    try{
      const result = await registerUser({
        name: name.trim(),
        username: username.trim(),
        email: email.trim(),
        password,
        phone_no: phone.trim(),
        dob: dob || null,
      });

      if( onRegister) {
        onRegister({
          name: name.trim(),
          username: username.trim(),
          email: email.trim(),
        });
      }
    } catch (error) {
      setError(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card register-card">
        <div className="auth-brand">
          <span className="auth-brand-icon">
            <Circle size={17}/>
          </span>
          <span>ChatApp</span>
        </div>

        <header className="auth-header">
          <h1>Create your account</h1>
          <p>It only takes a minute.</p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="register-name">Name</label>
            <input
              id = "register-name"
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(event)=> setName(event.target.value)}
              autoComplete="name"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="register-username">Username</label>
            <input
              id = "register-username"
              type="text"
              placeholder="username"
              value={username}
              onChange={(event)=> setUsername(event.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="register-email">Email</label>
            <input
              id = "register-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event)=> setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>


          <div className="auth-field">
            <label htmlFor="register-password">Password</label>
            <div className="auth-password-wrapper">
              <input
                id = "register-password"
                type={showPassword? "text": "password"}
                placeholder="At least 8 characters"
                value={password}
                onChange={(event)=> setPassword(event.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
              />
              <button
                type="button"
                className="auth-password-toggle"
                aria-label={
                  showPassword? "Hide password" :"Show password"
                }

                onClick={()=>
                  setShowPassword((previous)=>!previous )
                }
              >
                {showPassword ? (
                  <EyeOff size={17}/>
                ):(
                  <Eye size={17}/>
                )}
              </button>
            </div>
          </div>
          
          <div className="register-optional-row">
            <div className="auth-field">
              <label htmlFor="register-phone">Phone<span>(optional)</span></label>
              <input
                id = "register-phone"
                type="tel"
                placeholder="10-digits only"
                value={phone}
                onChange={(event)=> setPhone(event.target.value)}
                autoComplete="tel"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-dob">Date of Birth<span>(optional)</span></label>
              <input
                id = "register-dob"
                type="date"
                value={dob}
                onChange={(event)=> setDob(event.target.value)}
                autoComplete="bday"
              />
            </div>
          </div>

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="auth-submit"
          > 
            Create Account
          </button>
        </form>

        <p className="auth-switch">
          <span>Already have an account?</span>{" "}
          <button type="button" onClick={onOpenLogin}> 
            Log in 
          </button>
        </p>
      </section>
    </main>
  );
}
export default Register;
