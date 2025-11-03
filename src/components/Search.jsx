// src/pages/Search.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Search.css';

const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

const Search = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResults([]);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResults(data.results?.slice(0, 12) || []);
    } catch (err) {
      console.error('Search failed:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const goToMovie = (movie) => {
    if (!movie?.id) return;
    navigate(`/movie/${movie.id}`, { state: movie });
  };

  return (
    <div className="search-page">
      {/* Pass minimal prop to hide menu items */}
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} minimal />

      <div className="search-container">
        <h1 className="search-title">Search Movies</h1>

        <form onSubmit={searchMovies} className="search-wrapper search-form-inline">
          <input
            type="text"
            placeholder="e.g. Avengers, Inception..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? '...' : 'Search'}
          </button>
        </form>

        {results.length > 0 && (
          <div className="movie-grid">
            {results.map((movie) => (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => goToMovie(movie)}
              >
                <img
                  src={
                    movie.poster_path
                      ? `${IMG_BASE}${movie.poster_path}`
                      : 'https://via.placeholder.com/300x450?text=No+Image'
                  }
                  alt={movie.title}
                />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.release_date?.split('-')[0] || '????'}</p>
                  <div className="rating">
                    {movie.vote_average != null ? movie.vote_average.toFixed(1) : '?.?'}/10
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
