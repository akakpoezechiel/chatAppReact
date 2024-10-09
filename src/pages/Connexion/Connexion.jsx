import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './connexion.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Connexion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false); // Ajout pour gérer les erreurs
  const [errorText, setErrorText] = useState(''); // Ajout pour afficher le texte d'erreur

  // Navigation
  const navigate = useNavigate();

  const handle_login = async (e) => {
    e.preventDefault();
    setError(false);
    setErrorText('');

    // const formdata =  new Formdata();
    const formData = new FormData();

      formData.set("email",email);
      
      formData.set("password",password);
      
    

    const response = await axios.post('http://127.0.0.1:8000/api/v1.0.0/login', formData);

    if (response.data.success) {
      toast.success(response.data.message);

      setTimeout(function () {
        navigate("/Dashboard");
      }, 3000);

    } else {
      console.log(response.data);
     toast.error("email ou mot de passe incorrect");
     setIsLoading(false);
    }
    
  };

  return (
    <>
    <form onSubmit={handle_login}>
      <ToastContainer/>
      <p className="form-title">Sign in to your account</p>

      {error && <p className="error-text">{errorText}</p>} {/* Affichage de l'erreur */}

      <div className="input-container">
        <input
          placeholder="Enter email"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <span>
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>

      <div className="input-container">
        <input
          placeholder="Enter password"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span>
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>

      <button className="submit" type="submit">
        Sign in
      </button>

      <p className="signup-link">
        No account? <a href="/">Sign up</a>
      </p>
    </form>
    </>
  );
  
}
