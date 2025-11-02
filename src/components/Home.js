import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">WELCOME TO THE REVIEW PLATFORM</h1>
        <p className="home-subtitle">
          Discover, Create, and share reviews for <strong>Movies</strong> and <strong>Restaurants</strong>
        </p>
      </div>
    </div>
  );
};

export default Home;