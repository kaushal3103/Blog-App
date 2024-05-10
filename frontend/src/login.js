import React, { useState } from 'react';
import axios from 'axios';
import './index.css'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const Navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/v1/auth/login-user', {
        username,
        password
      });
      localStorage.setItem('token', response.data.token);

      setUsername('');
      setPassword('');
      window.alert("Successfully Login");
      Navigate("/adminpanel");
    } catch (error) {
        
      setError(error.response.data);
    }
  };

  return (
    <div className="login-container">
      <h1>Admin Login</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-container">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='loginbtn'>
        <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
