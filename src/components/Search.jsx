import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css'; // Optional – create for styling

const Search = ({ reviews }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setError(''); // Clear error on type
  };

  // Handle search button click
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload

    if (!query.trim()) {
      setError('Please enter a search term (e.g., movie or restaurant name).');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate a tiny delay (remove if not needed)
    setTimeout(() => {
      // Navigate to results with query param
      navigate(`/details/search?query=${encodeURIComponent(query.trim())}`);
      setLoading(false);
    }, 300);
  };

  // Optional: Live preview of results (client-side filter)
  const filteredResults = reviews.filter((review) =>
    review.title.toLowerCase().includes(query.toLowerCase()) ||
    review.review.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-container">
      <h2>Search Movies & Restaurants</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search for a movie or restaurant (e.g., 'Avengers' or 'McDonalds')"
            value={query}
            onChange={handleInputChange}
            className="search-input"
          />
          <button 
            type="submit" 
            className={`search-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        
        {error && <p className="error">{error}</p>}
      </form>

      {/* Optional: Live Preview (shows as you type) */}
      {query && filteredResults.length > 0 && !loading && (
        <div className="live-preview">
          <h3>Quick Preview:</h3>
          <ul>
            {filteredResults.slice(0, 5).map((review) => (
              <li key={review.id}>
                <strong>{review.title}</strong> ({review.type}) - Rating: {review.rating}/10
              </li>
            ))}
            {filteredResults.length > 5 && (
              <li>... and {filteredResults.length - 5} more</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;