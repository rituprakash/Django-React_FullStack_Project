
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function Admin_Signup() {
    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [passwordConf, setPasswordConf] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();
    function registerUser(){
        var user = {
            username: email,
            password1: password,
            password2: passwordConf
        }
        axios.post('http://127.0.0.1:8000/adminAccount/signup/',user).then(response=>{
            setErrorMessage('');
            navigate('/Login');
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            }else{
                setErrorMessage('Failed to connect to api');
            }
        })
    }
    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 mt-4">
                        <div className="card bg-light" style={{ maxHeight: "83vh", overflowY: "auto" }}>
                            <div className="card-body">
                                <h1 className="card-title text-center">Register</h1>
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onInput={(event) => setName(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={email}
                                        onInput={(event) => setEmail(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onInput={(event) => setPassword(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={passwordConf}
                                        onInput={(event) => setPasswordConf(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-dark btn-block" onClick={registerUser}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin_Signup;
