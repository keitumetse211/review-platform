import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const SearchResults = ({ reviews }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  // Filter reviews based on query
  const results = reviews.filter((review) =>
    review.title.toLowerCase().includes(query.toLowerCase()) ||
    review.review.toLowerCase().includes(query.toLowerCase())
  );

  if (!query) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Search Results</h2>
        <p>No search term provided. <Link to="/search">Go back to search</Link></p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Search Results for "{query}"</h2>

      {results.length === 0 ? (
        <p>
          No results found for "<strong>{query}</strong>". Try a different term.{' '}
          <Link to="/search">New Search</Link>
        </p>
      ) : (
        <div>
          {results.map((review) => (
            <div
              key={review.id}
              style={{
                border: '1px solid #eee',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h3>
                <Link to={`/review/${review.id}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                  {review.title}
                </Link>
              </h3>
              <p>
                <strong>Type:</strong> {review.type} | <strong>Rating:</strong> {review.rating}/10
              </p>
              <p>{review.review.substring(0, 150)}...</p>
              <small>
                By {review.author} on {new Date(review.date).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/search" style={{ color: '#007bff', fontWeight: 'bold' }}>
          ← New Search
        </Link>
      </div>
    </div>
  );
};

export default SearchResults;