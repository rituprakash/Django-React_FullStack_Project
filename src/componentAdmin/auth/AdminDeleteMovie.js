
import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import checkAuth from "../../components/auth/checkAuth";

function AdminDeleteMovie({ movieId, movieTitle, onHide, navigate }) {
    const user = useSelector(state => state.auth.user); // Get the user from Redux store
    const token = user?.token || ''; // Get the token from user object

    useEffect(() => {
        // Check if the user is authenticated
        if (!user || !user.token) {
            // If not authenticated, navigate to the login page
            navigate("/Admin_Login/");
            return;
        }
    }, [user, navigate]);

    const handleDelete = () => {
        axios
            .delete(`http://127.0.0.1:8000/adminAccount/delete_movie/${movieId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include token in the request headers
                }
            })
            .then(() => {
                onHide();
                navigate('/AdminListMovie'); // Use navigate to redirect
            })
            .catch((error) => {
                console.error("Error deleting movie:", error);
            });
    };

    return (
        <div className="modal fade show" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete Movie</h5>
                        <button type="button" className="close" onClick={onHide}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete the movie "{movieTitle}"?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onHide}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDeleteMovie;

