import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserLogout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.post('http://127.0.0.1:8000/userAccount/user_logout/', {}, {
            withCredentials: true
        })
        .then(response => {
            if (response.status === 200) {
                console.log(response.data.message); // Output: Logged out successfully
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

    return null; // As this component doesn't render anything
}

export default UserLogout;