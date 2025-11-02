import React, { useState, useEffect } from 'react';
import './styles.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import all components
import Navbar from './components/Navbar';
import Home from './components/Home';
import MyReviews from './components/MyReviews';
import UserProfile from './components/UserProfile';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import Register from './components/Register';
import CreateReview from './components/CreateReview';

function App() {
  // ──────────────────────────────────────────────────────────────
  // 1. Load reviews from localStorage on start
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('reviews');
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Save reviews to localStorage every time they change
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);
  // ──────────────────────────────────────────────────────────────

  // State for registered users
  const [users, setUsers] = useState([]);

  // Current logged-in user
  const [currentUser, setCurrentUser] = useState(null);

  // ──────────────────────────────────────────────────────────────
  // Add review with author email
  const addReview = (review) => {
    const newReview = {
      ...review,
      id: Date.now(),
      author: currentUser?.email || 'Anonymous', // Save email
      date: new Date().toISOString().split('T')[0],
    };
    setReviews([...reviews, newReview]);
  };

  // Update review (keep original author)
  const updateReview = (updatedReview) => {
    setReviews(reviews.map(r =>
      r.id === updatedReview.id
        ? { ...updatedReview, author: r.author }
        : r
    ));
  };

  // Delete review
  const deleteReview = (id) => {
    setReviews(reviews.filter(r => r.id !== id));
  };
  // ──────────────────────────────────────────────────────────────

  // Handle user registration
  const handleRegister = (userData) => {
    const newUser = { ...userData, id: Date.now() };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    alert('Registration successful! You are now logged in.');
  };

  // Handle login
  const handleLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      alert('Login successful!');
      return true;
    } else {
      alert('Invalid email or password');
      return false;
    }
  };

  // ──────────────────────────────────────────────────────────────
  // Protected Route – Only logged-in users
  const ProtectedRoute = ({ children }) => {
    return currentUser ? children : <Navigate to="/register" replace />;
  };
  // ──────────────────────────────────────────────────────────────

  return (
    <Router>
      <div className="App">
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

        <div className="content">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<Home />} />

            {/* Create Review – PROTECTED */}
            <Route
              path="/CreateReviews"
              element={
                <ProtectedRoute>
                  <CreateReview addReview={addReview} currentUser={currentUser} />
                </ProtectedRoute>
              }
            />

            {/* My Reviews – Show only current user's reviews */}
            <Route
              path="/MyReviews"
              element={
                <MyReviews
                  reviews={reviews}
                  currentUser={currentUser}
                  onUpdate={updateReview}
                  onDelete={deleteReview}
                />
              }
            />

            {/* Single Review View */}
            <Route
              path="/review/:id"
              element={
                <MyReviews
                  reviews={reviews}
                  currentUser={currentUser}
                  onUpdate={updateReview}
                  onDelete={deleteReview}
                />
              }
            />

            {/* Register Page */}
            <Route
              path="/register"
              element={<Register handleRegister={handleRegister} handleLogin={handleLogin} />}
            />

            {/* User Profile */}
            <Route
              path="/profile"
              element={<UserProfile user={currentUser} setCurrentUser={setCurrentUser} />}
            />

            {/* Search */}
            <Route path="/search" element={<Search reviews={reviews} />} />
            <Route path="/details/search" element={<SearchResults reviews={reviews} />} />

            {/* 404 */}
            <Route
              path="*"
              element={
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                  <h2>404 - Page Not Found</h2>
                  <p>Sorry, this page doesn't exist.</p>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;