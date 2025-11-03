import React from "react";
import { useLocation } from "react-router-dom";

const MovieDetails = () => {
  const { state: movie } = useLocation();

  if (!movie) return <h2>No movie data. Go back and search again.</h2>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>Released: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}/10</p>
    </div>
  );
};

export default MovieDetails;
