
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/authSlice';

function AdminLogout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        axios.post('http://127.0.0.1:8000/adminAccount/logout/', {}, {
            withCredentials: true
        })
        .then(response => {
            if (response.status === 200) {
                console.log(response.data.message); // Output: Logged out successfully
                dispatch(removeUser()); // Dispatch action to remove user from Redux store
                navigate('/Login/'); // Navigate to the login page
            } else {
                throw new Error('Logout failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error response
        });
    }

    return null; // This component doesn't render anything
}

export default AdminLogout;



