import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', {
        username,
        password,
      });

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setIsLoggedIn(true); // ✅ inform App
        navigate('/add'); // redirect after login
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      alert('Login error');
    }
  };



  return (
    <form onSubmit={handleLogin}>
      <h2>Admin Login</h2>
      <input type="text" placeholder="Username" value={username}
        onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password}
        onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
}

