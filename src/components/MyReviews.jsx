import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MyReviews.css';

const MyReviews = ({ reviews, currentUser, onUpdate, onDelete }) => {
  const [editingReview, setEditingReview] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Filter reviews by current user
  const userReviews = reviews.filter(
    review => review.author === currentUser?.email
  );

  // Start editing
  const handleEdit = (review) => {
    setEditingReview(review.id);
    setEditForm({ ...review });
  };

  // Save changes
  const handleSave = () => {
    onUpdate(editForm);
    setEditingReview(null);
  };

  // Cancel edit
  const handleCancel = () => {
    setEditingReview(null);
    setEditForm({});
  };

  // Render star rating
  const renderStars = (rating) => {
    const totalStars = 10;
    return (
      <div className="stars">
        {[...Array(totalStars)].map((_, i) => (
          <span
            key={i}
            className={`star ${i < rating ? 'filled' : 'empty'}`}
          >
            ★
          </span>
        ))}
        <span className="rating-num">{rating}/10</span>
      </div>
    );
  };

  // No user
  if (!currentUser) {
    return (
      <div className="my-reviews-table container">
        <p>Please log in to view your reviews.</p>
      </div>
    );
  }

  // No reviews
  if (userReviews.length === 0) {
    return (
      <div className="my-reviews-table container">
        <div className="no-reviews">
          <h3>No Reviews Yet</h3>
          <p>You haven't created any reviews. <Link to="/CreateReviews">Create one now!</Link></p>
        </div>
        <div className="create-btn-container">
          <Link to="/CreateReviews" className="create-btn">+ Create New Review</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="my-reviews-table container">
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>My Reviews</h2>

      <div className="table-wrapper">
        <table className="reviews-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Author</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userReviews.map((review) => (
              <tr key={review.id}>
                <td data-label="Title">
                  <Link to={`/review/${review.id}`} className="title-link">
                    {review.title}
                  </Link>
                </td>
                <td data-label="Type">
                  <span className={`badge ${review.type.toLowerCase()}`}>
                    {review.type}
                  </span>
                </td>
                <td data-label="Rating">{renderStars(review.rating)}</td>
                <td data-label="Review" className="review-text">
                  {review.review.substring(0, 80)}...
                </td>
                <td data-label="Author">{review.author}</td>
                <td data-label="Date">{review.date}</td>
                <td data-label="Actions" className="actions-cell">
                  <button
                    className="action-btn edit"
                    onClick={() => handleEdit(review)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => onDelete(review.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="create-btn-container">
        <Link to="/CreateReviews" className="create-btn">
          + Create New Review
        </Link>
      </div>

      {/* Edit Modal */}
      {editingReview && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Review</h3>
            <div className="edit-form">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={editForm.title || ''}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={editForm.type || ''}
                  onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                >
                  <option value="Movies">Movies</option>
                  <option value="Restaurant">Restaurant</option>
                </select>
              </div>
              <div className="form-group">
                <label>Rating (1-10)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={editForm.rating || ''}
                  onChange={(e) => setEditForm({ ...editForm, rating: parseInt(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label>Review</label>
                <textarea
                  value={editForm.review || ''}
                  onChange={(e) => setEditForm({ ...editForm, review: e.target.value })}
                />
              </div>
              <div className="modal-actions">
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;