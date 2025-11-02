// src/services/api.js
import axios from 'axios';

const API_KEY_MOVIE = 'YOUR_OMDB_API_KEY'; // Replace with your OMDb API key
const API_URL_MOVIE = `https://www.omdbapi.com/?apikey=${API_KEY_MOVIE}`;

export const fetchExternalData = async (type, value) => {
  if (type === 'search') {
    // Search movies
    const response = await axios.get(`${API_URL_MOVIE}&s=${encodeURIComponent(value)}`);
    return response.data;
  } else if (type === 'id') {
    // Fetch by ID
    const response = await axios.get(`${API_URL_MOVIE}&i=${value}`);
    return response.data;
  }
  // Extend for restaurants if needed
};