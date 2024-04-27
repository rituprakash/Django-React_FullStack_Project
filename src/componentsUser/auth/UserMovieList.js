import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../userNavbar';
import { useSelector } from 'react-redux';
import checkAuth from "../../components/auth/checkAuth";

const UserMovieList = () => {
  const [movies, setMovies] = useState([]);
  const user = useSelector(state => state.auth.user); // Get the user from Redux store
  const token = user?.token || ''; // Get the token from user object
  const navigate = useNavigate(); 

  useEffect(() => {
    // Check if the user is authenticated
    if (!user || !user.token) {
      // If not authenticated, navigate to the login page
      navigate("/User_Login//");
      return;
    }

    axios.get('http://127.0.0.1:8000/userAccount/movie_Listing/', {
      headers: {
        'Authorization': `Bearer ${token}` // Include token in the request headers
      }
    })
      .then(response => setMovies(response.data))
      .catch(error => console.error('Error fetching movies:', error));
  }, [token, user, navigate]);

  const handleMouseOver = (e) => {
    e.target.style.transform = 'scale(1.05)';
  };

  const handleMouseOut = (e) => {
    e.target.style.transform = 'scale(1)';
  };

  return (
    <div>
      <Navbar />
      <div className='text-white text-center mt-3 mb-5'>
        <h1>Popular Shows</h1>
      </div>
      <div className="card-deck">
        {movies.map(movie => (
          <div key={movie.id} className="card" style={{ transition: 'transform 0.3s ease' }} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <div className="card-img-container" style={{ overflow: 'hidden', height: '200px' }}>
              <img
                src={movie.image_url}
                className="card-img-top"
                alt={movie.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              {/* You can add a description or other movie details here if needed */}
            </div>
            <div className="card-footer" style={{ display: 'flex', justifyContent: 'center' }}>
              <Link to={`/userViewMovie/${movie.id}`} className="btn btn-primary">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default checkAuth(UserMovieList);

