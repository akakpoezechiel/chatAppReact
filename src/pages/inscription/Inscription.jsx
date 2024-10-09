import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Connexion/connexion.css';

export default function Inscription() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  // Navigation
  const navigate = useNavigate();

  const handle_register = async (e) => {
    e.preventDefault();
    setError(false);
    setErrorText('');

    // Vérification si les mots de passe sont identiques
    if (password !== confirmPassword) {
      setError(true);
      setErrorText('Les mots de passe ne sont pas identiques');
      return;
    }
   
    try {
      // Envoi des données au serveur
      const response = await axios.post('http://127.0.0.1:8000/api/v1.0.0/register', {

        name,
        email,
        password,
        password_confirmation: confirmPassword

      });

      console.log(response.data);

      // Si l'inscription est réussie, redirection vers la page de connexion ou gestion de l'OTP
      console.log('Enregistré avec succès:', response.data);

      // Si le backend envoie un OTP, tu peux gérer ça ici
      // Par exemple, rediriger vers une page pour entrer l'OTP
      navigate('/Connexion'); // Remplace par la page adéquate

    } catch (error) {
      if (error.response) {
        setError(true);
        setErrorText(error.response.data.message || 'Erreur lors de l\'inscription');
        console.error('Erreur lors de la requête:', error.response.data);
      } else {
        setError(true);
        setErrorText('Erreur inconnue');
        console.error('Erreur inconnue:', error.message);
      }
    }
  };

  return (
    <form onSubmit={handle_register}>
      <p className="form-title">Créer un compte</p>
      
      {error && <p className="error-text">{errorText}</p>}

      {/* Champ pour le nom */}
      <div className="input-container">
        <input
          placeholder="Entrez votre nom"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Champ pour l'email */}
      <div className="input-container">
        <input
          placeholder="Entrez votre email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Champ pour le mot de passe */}
      <div className="input-container">
        <input
          placeholder="Entrez un mot de passe"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Champ pour la confirmation du mot de passe */}
      <div className="input-container">
        <input
          placeholder="Confirmez votre mot de passe"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <input type="submit" value="soumettre" />

      {/* Bouton d'inscription */}
      <button className="submit" type="submit">
        Inscription
      </button>

      {/* Lien vers la page de connexion */}
      <p className="signup-link">
        Déjà un compte ?
        <a href="/Connexion">Connectez-vous ici</a>
      </p>
    </form>
  );
}
