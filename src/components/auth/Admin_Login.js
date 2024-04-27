
// Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedType, setSelectedType] = useState('user'); // Default to regular user
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        axios.post('http://127.0.0.1:8000/adminAccount/combined_login/', {
            username: email,
            password: password
        }).then(response => {
            setErrorMessage('');
            console.log(response)
            const userType = response.data.user_type;

            if (userType === 'user') {
                // Dispatch user details to store
                const user = {
                    email: response.data.email,
                    token: response.data.token,
                    userId: response.data.userId
                };
                dispatch(setUser(user));
                // Redirect to user dashboard
                navigate('/UserMovieList');
            } else if (userType === 'admin') {
                // Redirect to admin dashboard
                navigate('/AdminListMovie');
            }
        }).catch(error => {
            // Handle login error
            setErrorMessage('Invalid credentials. Please try again.');
        });
    };

    return (
        <div>
            <Navbar/>
            {/* Login page content */}
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h1 className="card-title text-center">Login</h1>
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input type="text"
                                        className="form-control"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <button className="btn btn-dark btn-block" onClick={handleLogin}>Login</button>
                                </div>
                                <div className="text-center">
                                    <p>Don't have an account? <Link className="text-dark" to="/User_Signup">Sign Up</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
