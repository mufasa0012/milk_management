import React, { useState } from 'react';

const dummyAccounts = {
  admin: 'admin123',
  farmer: 'farmer123',
  driver: 'driver123',
  shop: 'shop123',
};

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const user = username.toLowerCase();
    if (dummyAccounts[user] && dummyAccounts[user] === password) {
      onLogin(user);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleUsernameChange = (e) => {
    const selectedUser = e.target.value;
    setUsername(selectedUser);
    setPassword(dummyAccounts[selectedUser] || '');
  };

  const containerStyle = {
    backgroundColor: '#f7f7f7',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    width: '100%',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 className="text-center mb-4">Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Username</label>
          <select
            className="form-select"
            value={username}
            onChange={handleUsernameChange}
          >
            <option value="">Select Profession</option>
            <option value="admin">Admin</option>
            <option value="farmer">Farmer</option>
            <option value="driver">Driver</option>
            <option value="shop">Shop</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <select
            className="form-select"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!username}
          >
            <option value="">Select Password</option>
            {username && <option value={dummyAccounts[username]}>{dummyAccounts[username]}</option>}
          </select>
        </div>

        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
