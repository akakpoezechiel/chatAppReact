import React, { useState, useEffect } from "react";
import "./dashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ChatApp() {
  const [activeGroup, setActiveGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [selectedfile, setSelectedFile] = useState(null);
  const [usersInGroup, setUsersInGroup] = useState({});
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [filename, setFilename] = useState("");
  const [userId, setUserId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allUsers, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [email, setEmail] = useState(""); // Initialise l'état pour stocker l'email
  const [groupeId, setGroupeId] = useState(null);
  const [members, setMembers] = useState([])

  // Fonction pour gérer l'envoi de messages
  const sendMessage = () => {
    if (newMessage.trim() !== "" && activeGroup !== null) {
      setMessages((prev) => [
        ...prev,
        { text: newMessage, sender: "me", group: groups[activeGroup].name },
      ]);
      setNewMessage("");
    }
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Reviens à la page précédente
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Récupérer le premier fichier sélectionné
  };

  // Fonction pour créer un groupe
  const createGroup = () => {
    if (groupName.trim() !== "") {
      setGroups([...groups, { name: groupName, users: [] }]);
      setUsersInGroup((prev) => ({ ...prev, [groupName]: [] }));
      setGroupName("");
    }

    axios.post("http://127.0.0.1:8000/api/v1.0.0/createGroup", {
      name: groupName,
      description: "Description du groupe", // Tu peux ajouter un champ pour la description si nécessaire
      user_id: 1, // Remplacer par l'ID de l'utilisateur connecté
    });
  };

  const fetchGroups = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1.0.0/allGroupe"
      );
      setGroups(response.data.data.groups); // Adapte ceci selon la structure de ta réponse
      console.log(response.data.data.groups);
    } catch (error) {
      console.error("Erreur lors de la récupération des groupes :", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const addUserToGroup = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
    };

    console.log(groupId);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1.0.0/groupe/${groupId}/addUser`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      // Le reste du code
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Erreur lors de l'ajout de l'utilisateur.";
      console.log(error.response?.data);
      setError(true);
      setErrorText(errorMessage);
      toast.error(errorMessage);
    }
  };

  //     .then(response => {
  //         setUsersInGroup((prev) => ({
  //             ...prev,
  //             [groups[activeGroup].name]: [...(prev[groups[activeGroup].name] || []), user],
  //         }));

  //         setNewUserName('');
  //         setNewUserEmail('');
  //         setShowAddUserForm(true);
  //     })

  //   } else {
  //     console.log("Veuillez entrer un nom d'utilisateur et un email valides.");
  //   }
  // };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedfile) {
      setUploadStatus("Aucun fichier sélectionné.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedfile);
    formData.append("user_id", 1);
    formData.append("group_id", groupId);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1.0.0/file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus("Fichier envoyé avec succès !");
      console.log(response.data);
    } catch (error) {
      setUploadStatus("Erreur lors de l'envoi du fichier.");
      console.error(
        "Erreur:",
        error.response ? error.response.data : error.message
      );
    }
  };

 

    useEffect(() => {
        const fetchMembers = async () => {
          // console.log(groups[activeGroup].id);
          
          
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/v1.0.0/groupes/${groups[activeGroup].id}/members`);
                
                 setMembers(response.data);

                //  console.log(response.data);
                 
                console.log(response.data);
            } catch (error) {
                setError('Erreur lors de la récupération des membres.');
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, [groups[activeGroup]]);

    // console.log('response.data');


  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1.0.0/all_users"
      );
      // console.log(response.data);

      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages([]);
    fetchMessages();
  };

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 5000);
    return () => clearInterval(interval);
  }, []);
  
  // Fonction pour récupérer les fichiers depuis l'API
  const fetchFiles = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1.0.0/getAllFiles/${groupId}`
      ); // Remplace par ton URL API
      setFiles(response.data.data.files);
      console.log(response.data.data.files);
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors de la récupération des fichiers:", err);
      setError("Erreur lors de la récupération des fichiers");
      setLoading(false);
    }
  };
  
    useEffect(() => {
      fetchFiles();
    }, [groupId]);

  return (
    <div className="chat-app">
      {/* Sidebar pour lister tous les utilisateurs */}
      <div className="users-sidebar">
        <h2> Listes des Utilisateurs</h2>
        <div className="user-list">
          {allUsers.map((user, index) => (
            <div key={index} className="user">
              {user.name} ({user.email}) (
              <div
                className={`contact ${
                  selectedUser && selectedUser.id === user.id ? "active" : ""
                }`}
                key={user.id}
                onClick={() => handleUserSelect(user)}
              >
                <div
                  className="pic"
                  style={{
                    backgroundImage: `url(${user.avatar})`,
                    backgroundSize: "cover",
                  }}
                />

                {/* <p style={{ fontWeight: "bold", color: "black" }}>
                  {user.name}
                </p> */}
              </div>
              )
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar pour lister les groupes */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Groupes</h2>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Nom du groupe"
          />
          <button onClick={createGroup}>Créer un groupe</button>
        </div>
        <div className="group-list">
          {groups.map((group, index) => (
            <div
              key={group.id}
              className={`group ${activeGroup === index ? "active" : ""}`}
              onClick={() => {
                setActiveGroup(() => index);
                setGroupId(group.id);
                setMessages([]);
              }}
            >
              {group.name}
            </div>
          ))}
        </div>
      </div>

      {/* Fenêtre de chat */}
      <div className="chat-window">
        {activeGroup !== null ? (
          <div className="chat-content">
            <div className="user-sidebar">
              <button onClick={handleGoBack}>Retour</button>
              <h3>Utilisateurs dans ce groupe</h3>
              {usersInGroup[groups[activeGroup].name]?.map((user, index) => (
                <div key={index} className="user">
                  {user.name} ({user.email})
                </div>
              ))}
              {showAddUserForm && (
                <div className="add-user-form">
                  {/* <input
                      type="text"
                      placeholder="Nom de l'utilisateur"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                    /> */}
                  <input
                    type="email"
                    placeholder="Entrez l'email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Récupère la valeur de l'input
                  />
                  <button onClick={addUserToGroup}>Ajouter</button>
                </div>
              )}
              <button onClick={() => setShowAddUserForm(!showAddUserForm)}>
                {showAddUserForm ? "Annuler" : "Ajouter un utilisateur"}
              </button>
              <div>
            <h3>Membres du groupe</h3>
            <ul>
                {members.map(member => (
                    <li key={member.id}>{member.name} ({member.email})</li>
                ))}
            </ul>
        </div>
            </div>

            <div className="message-area">
              <div className="chat-header">
                <h3>{groups[activeGroup].name}</h3>
                <p>ID du groupe : {groupId}</p>
              </div>
              <div className="chat-messages">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`message ${
                      message.sender === "me" ? "sent" : "received"
                    }`}
                  >
                    {message.text || `Fichier envoyé: ${message.file}`}
                  </div>
                ))}
              </div>

              {/* <a href="../"> */}

              <div className="file-list-view">
                <div style={{ position: "static" }}>
                  {/* <button onClick={handleGoBack}>Retour</button> */}
                  <h2>Liste des fichiers</h2>
                </div>
                {loading ? (
                  <p>Chargement des fichiers...</p>
                ) : files.length === 0 ? (<p>Aucun fichier</p>) :
                //  error ? (
                //   <p>{error}</p>
                // ) : 
                (
                  <ul>
                    {files.map((file, index) => (
                      <li key={index}>
                        <p>Nom du fichier :<a href={`http://127.0.0.1:8000/Upload/${file.filename}`} download>
                        {/* <p>Nom du fichier :<a href={`http://127.0.0.1:8000/api/v1.0.0/dawnload/${file.name}`} download> */}
                        {file.filename}
                    </a></p>
                        <p>
                          Taille du fichier : {(10804 / 1024).toFixed(2)} Ko
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>


              {/* </a> */}
              {/* <div>
                <Link to="/FileListView">
                  <button>Voir la liste des fichiers</button>
                </Link>
              </div> */}

              <div className="chat-input">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Tapez votre message..."
                />
                <label htmlFor="image">
                  <img src="src/assets/react.svg" alt="" />
                </label>
                <input
                  type="file"
                  id="image"
                  onChange={handleFileChange}
                  hidden
                />
                <button onClick={sendMessage}>Envoyer</button>
                <button onClick={handleUpload}>Envoyer Fichier</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-chat-selected">
            Sélectionnez un groupe pour commencer à discuter
          </div>
        )}
      </div>
    </div>
  );
}

