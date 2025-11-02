// components/Register.js
import React, { useState } from 'react';

function Register({ handleRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({ email, password });
    // Clear form after registration
    setEmail('');
    setPassword('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ margin: '10px 0 5px' }}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '8px', fontSize: '16px' }}
        />

        <label style={{ margin: '10px 0 5px' }}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '8px', fontSize: '16px' }}
        />

        <button type="submit" style={{ marginTop: '15px', padding: '10px', fontSize: '16px' }}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;