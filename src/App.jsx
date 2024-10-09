
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
export default function App() {

    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
 //navige
  const navigate = useNavigate();

  const handle_register = async (e) => {
    e.preventDefault();

    console.log('appuyer');
    

    // Vérification si les mots de passe sont identiques
    if (password !== confirmPassword) {
      alert('Les mots de passe ne sont pas identiques');
      return;
    }

    try {
      // Envoi des données au serveur
      const response = await axios.post('http://127.0.0.1:8000/api/v1.0.0/register', {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword // Remplacer ici par `password_confirm`
      });
      //navige
      navigate('/Connexion')

      console.log('Enregistré avec succès:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Erreur lors de la requête:', error.response.data);
      } else {
        console.error('Erreur inconnue:', error.message);
      }
    }
  };

  return (
    <form className="form" onSubmit={handle_register}>
      <p className="form-title">Create an account</p>
      
      {/* Champ pour le nom */}
      <div className="input-container">
        <input placeholder="Enter your name" type="text" required  onChange={(e) => setName(e.target.value)}/>
      </div>

      {/* Champ pour l'email */}
      <div className="input-container">
        <input placeholder="Enter email" type="email" required  onChange={(e) => setEmail(e.target.value)} />
        <span>
          <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
          </svg>
        </span>
         
      </div>

      {/* Champ pour le mot de passe */}
      <div className="input-container">
        <input placeholder="Enter password" type="password" required   onChange={(e) => setPassword(e.target.value)} />
        <span>
          <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
          </svg>
        </span>
      </div>
      <div className="input-container">
        <input placeholder="Enter password_confirm" type="password_confirm" required  onChange={(e) => setConfirmPassword(e.target.value)} />
        <span>
          <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
          </svg>
        </span>
      </div>

      {/* Bouton d'inscription */}
      <button className="submit" type="submit">
        Sign up
      </button>

      {/* Lien vers la page de connexion */}
      <p className="signup-link">
        Already have an account?
        <a href="/connexion">Sign in</a>
      </p>
    </form>
  );
}

