import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    setCurrentUser(null);
    alert('You have been logged out.');
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>

        {/* Show Register/Login only when NOT logged in */}
        {!currentUser && (
          <>
            <li><Link to="/register">Register</Link></li>
          </>
        )}

        {/* Show CreateReviews only when logged in */}
        {currentUser ? (
          <li><Link to="/CreateReviews">Create Review</Link></li>
        ) : (
          <li><span style={{ color: '#aaa' }}>Create Review (login required)</span></li>
        )}

        <li><Link to="/MyReviews">My Reviews</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/profile">Profile</Link></li>

        {/* Login / Logout */}
        {currentUser ? (
          <>
            <li style={{ float: 'right', marginLeft: '1rem' }}>
              <span>Hello, {currentUser.email}</span>
            </li>
            <li style={{ float: 'right' }}>
              <button onClick={handleLogout} style={{
                background: 'none',
                border: 'none',
                color: '#d32f2f',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                Logout
              </button>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
};

export default Navbar;