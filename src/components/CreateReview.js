import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateReview.css';

const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

const CreateReview = ({ addReview, currentUser }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: '', type: 'Movie', rating: 5, review: '' });
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setMovies([]);
    try {
      const res = await fetch(`${SEARCH_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setMovies(data.results?.slice(0, 12) || []);
    } catch { setMovies([]); }
    setLoading(false);
  };

  const pickMovie = (movie) => {
    const year = movie.release_date?.split('-')[0] || '';
    setForm({ ...form, title: `${movie.title} ${year ? `(${year})` : ''}` });
    setQuery(''); setMovies([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.review.trim()) return alert('Fill title & review!');
    addReview({ ...form, rating: +form.rating, date: new Date().toISOString(), author: currentUser?.email || 'Guest' });
    setForm({ title: '', type: 'Movie', rating: 5, review: '' });
    navigate('/MyReviews');
  };

  return (
    <div className="create-review container">
      <h2>Create a New Review</h2>

      {/* SEARCH BAR – BUTTON GLUED TO END */}
      <div className="search-wrapper">
        <form onSubmit={searchMovies} className="search-form-inline">
          <input
            type="text"
            placeholder="Search any movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? '...' : 'Search'}
          </button>
        </form>
      </div>

      {/* MOVIE GRID */}
      {movies.length > 0 && (
        <div className="movie-grid">
          {movies.map(m => (
            <div key={m.id} className="movie-card" onClick={() => pickMovie(m)}>
              <img src={m.poster_path ? `${IMG_BASE}${m.poster_path}` : 'https://via.placeholder.com/180x270?text=No+Image'} alt={m.title} />
              <p>{m.title}</p>
              <small>{m.release_date?.split('-')[0] || ''}</small>
            </div>
          ))}
        </div>
      )}

      {/* YOUR ORIGINAL FORM */}
      <form onSubmit={handleSubmit} className="create-review-form">
        <div className="form-group">
          <label>Title *</label>
          <input name="title" placeholder="Auto-filled or type anything" value={form.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Type</label>
          <select name="type" value="Movie" disabled><option>Movie</option></select>
        </div>
        <div className="form-group">
          <label>Rating (1-10) *</label>
          <input type="number" name="rating" min="1" max="10" value={form.rating} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Review *</label>
          <textarea name="review" rows="6" placeholder="Your thoughts..." value={form.review} onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-btn">Submit Review</button>
      </form>
    </div>
  );
};

export default CreateReview;