import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Definizione tipo utente
interface UserProfile {
  id: number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  birthdayPlace: string;
  province: string;
  sex: string;
  phoneNumber: number;
  



  
}

// Componente profilo
const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const backendURL = 'http://localhost:3001/api/users';

  useEffect(() => {
    const username = localStorage.getItem('username');


    axios
      .get<UserProfile>(`${backendURL}/profile/${username}`)
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        setError('Errore durante il recupero del profilo');
      });
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Caricamento...</p>;

  return (
    <div>
      <h2>Profilo Utente</h2>
      <p><strong>firstName:</strong> {user.username}</p>
      <p><strong>lastName:</strong> {user.lastName}</p>
      <p><strong>email:</strong> {user.email}</p>
      <p><strong>password:</strong> {user.password}</p>
      <p><strong>phoneNumber:</strong> {user.phoneNumber}</p>

      <button onClick={() => {
        localStorage.removeItem('username');
        window.location.href = '/login';
      }}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
