import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateReview.css';   // optional styling file – create it if you want

const CreateReview = ({ addReview, currentUser }) => {
  const navigate = useNavigate();

  // Local form state
  const [form, setForm] = useState({
    title: '',
    type: 'Movie',          // default
    rating: 5,
    review: '',
  });

  // Handle any input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.title.trim() || !form.review.trim()) {
      alert('Title and Review are required!');
      return;
    }

    // Build the review object
    const newReview = {
      ...form,
      rating: Number(form.rating),   // ensure number
      date: new Date().toISOString(),
      author: currentUser?.email || 'Guest',
    };

    // Call the function passed from App.js
    addReview(newReview);

    // Reset form
    setForm({
      title: '',
      type: 'Movies',
      rating: 5,
      review: '',
    });

    // Optional: go back to MyReviews after submit
    navigate('/MyReviews');
  };

  return (
    <div className="create-review container">
      <h2>Create a New Review</h2>

      <form onSubmit={handleSubmit} className="create-review-form">

        {/* ---- Title ---- */}
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter review title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* ---- Type ---- */}
        <div className="form-group">
          <label htmlFor="type">Type *</label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option value="Movies">Movies</option>
            <option value="Restaurant">Restaurant</option>
          </select>
        </div>

        {/* ---- Rating ---- */}
        <div className="form-group">
          <label htmlFor="rating">Rating (1-10) *</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="10"
            value={form.rating}
            onChange={handleChange}
            required
          />
        </div>

        {/* ---- Review Text ---- */}
        <div className="form-group">
          <label htmlFor="review">Review *</label>
          <textarea
            id="review"
            name="review"
            rows="6"
            placeholder="Write your detailed review..."
            value={form.review}
            onChange={handleChange}
            required
          />
        </div>

        {/* ---- Submit ---- */}
        <button type="submit" className="submit-btn">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default CreateReview;