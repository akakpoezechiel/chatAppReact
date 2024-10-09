import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Files/file.css';
import { useNavigate } from 'react-router-dom';

export default function FileListView() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les fichiers depuis l'API
  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1.0.0/getAllFiles'); // Remplace par ton URL API
      setFiles(response.data.data.files);
      console.log(response.data.data.files);
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors de la récupération des fichiers:', err);
      setError('Erreur lors de la récupération des fichiers');
      setLoading(false);
    }
  };


  const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Reviens à la page précédente
    };


  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    
    <div className="file-list-view" >
      <div style={{ position: 'static' }}>
        <button onClick={handleGoBack}>Retour</button>
        <h2>Liste des fichiers</h2>
      </div>
      {loading ? (
        <p>Chargement des fichiers...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <p>Nom du fichier : {file.name}</p>
              <p>Taille du fichier : {(file.size / 1024).toFixed(2)} Ko</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  
  );
}
