

// ADDED user id from auth_user table of phpmyadmin 


import { useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";

function User_Login() {
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    var navigate = useNavigate();
    
    function attemptLogin() {
        axios.post('http://127.0.0.1:8000/userAccount/user_login/',{
            username:email,
            password:password
        }).then(response=>{
            setErrorMessage('')

            var user = {
                email: response.data.email,
                token: response.data.token,
                userId: response.data.userId // Include user_id from response
            }
            dispatch(setUser(user));

            navigate('/UserMovieList');
            console.log(response.data.token)
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '))
            }else if(error.response.data.message){
                setErrorMessage(error.response.data.message)
            }else{
                setErrorMessage('Failed to login user. Please contact admin')
            }
        })
    }

    return (
        <div>
            <Navbar/>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h1 className="card-title text-center">Login</h1>
                                {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
                                <div className="form-group">
                                    <label>Username:</label>
                                    <input type="text"
                                        className="form-control"
                                        value={email}
                                        onChange={(event)=>setEmail(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(event)=>setPassword(event.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <button className="btn btn-dark btn-block" onClick={attemptLogin}>Login</button>
                                </div>
                                <div className="text-center">
                                    <p>Don't have an account..?<Link className="text-danger" to="/User_Signup">  Sign Up</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User_Login;
