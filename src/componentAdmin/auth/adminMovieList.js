
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../adminNavbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import checkAuth from "../../components/auth/checkAuth";

function AdminListMovie() {
    const [movies, setMovies] = useState([]);
    const [movieToDelete, setMovieToDelete] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const token = user?.token || "";

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {
        if (!user?.token) {
            navigate("/Admin_Login/");
        }
    }, [user, navigate, token]);

    const fetchMovies = () => {
        axios.get('http://127.0.0.1:8000/adminAccount/list_movies/', {
            headers: {
                Authorization: 'Bearer' + token }
        })
        .then(response => {
            const moviesWithEnabled = response.data.map(movie => ({
                ...movie,
                enabled: movie.is_enabled
            }));
            setMovies(moviesWithEnabled);
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    const handleEdit = (movieId) => {
        navigate(`/AdminEditMovie/${movieId}`);
    };

    const handleDelete = (movieId) => {
        setMovieToDelete(movieId);
        setShowConfirmationModal(true);
    };

    const confirmDelete = () => {
        axios.delete(`http://127.0.0.1:8000/adminAccount/delete_movie/${movieToDelete}/`, {
            headers: {
                Authorization: 'Bearer' + token
             }
        })
        .then(() => {
            fetchMovies();
        })
        .catch((error) => {
            console.error("Error deleting movie:", error);
        })
        .finally(() => {
            setShowConfirmationModal(false);
        });
    };

    const toggleEnable = (movieId, isEnabled) => {
        const url = isEnabled
            ? `http://127.0.0.1:8000/adminAccount/enable_movie/${movieId}/`
            : `http://127.0.0.1:8000/adminAccount/disable_movie/${movieId}/`;

        axios.post(url, null, {
            headers: {
                Authorization: 'Bearer' + token
             }
        })
        .then(() => {
            const updatedMovies = movies.map(movie => {
                if (movie.id === movieId) {
                    return { ...movie, enabled: isEnabled };
                }
                return movie;
            });
            setMovies(updatedMovies);
        })
        .catch(error => {
            console.error(`Error ${isEnabled ? 'enabling' : 'disabling'} movie:`, error);
        });
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center text-white my-4">Movie List</h1>
                    </div>
                </div>
                <div className="row">
                {movies.map(movie => (
    <div className="col-md-4 mb-4" key={movie.id} style={{ opacity: movie.enabled ? 1 : 0.5 }}>
        <div className="card">
            <img
                src={movie.image_url}
                className="card-img-top"
                alt={movie.title}
                onError={(e) => console.log("Error loading image:", e)}
            />
            <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.genre}</p>
                <p className="card-text">{movie.description}</p>
            </div>
            <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-primary" onClick={() => handleEdit(movie.id)} disabled={!movie.enabled}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(movie.id)} disabled={!movie.enabled}>Delete</button>
                <button className={`btn ${!movie.enabled ? 'btn-warning' : 'btn-success'}`} onClick={() => toggleEnable(movie.id, !movie.enabled)}>
                    {!movie.enabled ? 'Disabled' : 'Enabled'}
                </button>
            </div>
        </div>
    </div>
))}

                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmationModal && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete Movie</h5>
                                <button type="button" className="close" onClick={() => setShowConfirmationModal(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete the movie?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmationModal(false)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default checkAuth(AdminListMovie);