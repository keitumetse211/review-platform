import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import './MovieDetails.css';

const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

const MovieDetails = ({ currentUser, setCurrentUser, reviews }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const initialMovie = location.state; // movie passed from Search
  const [movie, setMovie] = useState(initialMovie || null);
  const [loading, setLoading] = useState(!initialMovie);

  useEffect(() => {
    if (!movie) {
      setLoading(true);
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => setMovie(data))
        .catch(err => console.error("Failed to fetch movie:", err))
        .finally(() => setLoading(false));
    }
  }, [id, movie]);

  if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;
  if (!movie) return <p style={{ padding: "2rem" }}>Movie not found.</p>;

  // Filter reviews for this movie
  const movieReviews = reviews?.filter(r =>
    r.title.includes(movie.title)
  );

  return (
    <div className="movie-details-page">
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

      <div className="movie-details-container">
        <div className="movie-poster">
          <img
            src={movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : "https://via.placeholder.com/300x450?text=No+Image"}
            alt={movie.title}
          />
        </div>

        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p><strong>Release Date:</strong> {movie.release_date || "N/A"}</p>
          <p><strong>Rating:</strong> {movie.vote_average?.toFixed(1) || "?.?"}/10</p>
          <p><strong>Genres:</strong> {movie.genres?.map(g => g.name).join(", ") || "N/A"}</p>
          <p><strong>Overview:</strong> {movie.overview || "No description available."}</p>

          <button onClick={() => navigate(-1)} style={{ marginTop: "1rem" }}>
            ← Back to Search
          </button>

          <hr style={{ margin: "1rem 0" }} />

          <h2>User Reviews</h2>
          {movieReviews.length > 0 ? (
            movieReviews.map(r => (
              <div key={r.id} style={{ marginBottom: "1rem", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "5px" }}>
                <p><strong>{r.author}</strong> ({r.date})</p>
                <p>Rating: {r.rating}/10</p>
                <p>{r.review}</p>
              </div>
            ))
          ) : (
            <p>No reviews for this movie yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
