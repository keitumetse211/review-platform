import React from 'react';
import './UserProfile.css'; // Will create next

const UserProfile = ({ user, setCurrentUser }) => {
  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-placeholder">
            <span className="avatar-initial">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
          <h2 className="profile-title">User Profile</h2>
        </div>

        <div className="profile-body">
          {user && user.email ? (
            <>
              <div className="profile-info">
                <span className="info-label">Email:</span>
                <span className="info-value">{user.email}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <p className="no-user">
              User profile information will be displayed here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;