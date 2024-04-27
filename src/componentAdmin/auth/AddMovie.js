
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../adminNavbar";
import { useSelector } from "react-redux";

function AddMovie() {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [image_url, setImageUrl] = useState('');
    const [ticket_price, setTicketPrice] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [time1Checked, setTime1Checked] = useState(false);
    const [time2Checked, setTime2Checked] = useState(false);
    const [time3Checked, setTime3Checked] = useState(false);
    const [time4Checked, setTime4Checked] = useState(false);
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const token = user?.token || '';

    useEffect(() => {
        if (!user || !user.token) {
            navigate("/Admin_Login/");
        }
    }, [user, navigate]);

    function addMovie() {
        axios.post('http://127.0.0.1:8000/adminAccount/add_movie/', {
            title: title,
            genre: genre,
            description: description,
            image_url: image_url,
            ticket_price: ticket_price,
            time1: time1Checked ? '11:30pm' : '00:00',
            time2: time2Checked ? '2:30pm' : '00:00',
            time3: time3Checked ? '5pm' : '00:00',
            time4: time4Checked ? '9pm' : '00:00',
            startDate: startDate,
            endDate: endDate
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            navigate('/AdminListMovie'); 
        })
        .catch(error => {
            console.error('Error adding movie:', error);
        });
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center text-danger mt-4">Add Movie</h1>
                        <div className="card bg-transparent">
                            <div className="card-body">
                                <div className="form-group text-white">
                                    <label>Title:</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={title} 
                                        onChange={(event) => setTitle(event.target.value)}
                                    />
                                </div>
                                <div className="form-group text-white">
                                    <label>Genre:</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={genre} 
                                        onChange={(event) => setGenre(event.target.value)}
                                    />
                                </div>
                                <div className="form-group text-white">
                                    <label>Description:</label>
                                    <textarea 
                                        className="form-control" 
                                        value={description} 
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                </div>
                                <div className="form-group text-white">
                                    <label>Image URL:</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={image_url} 
                                        onChange={(event) => setImageUrl(event.target.value)}
                                    />
                                </div>
                                <div className="form-group text-white">
                                    <label>Ticket Price:</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={ticket_price} 
                                        onChange={(event) => setTicketPrice(event.target.value)}
                                    />
                                </div>

                                <div className="form-group text-white">
                                    <label>Show Start Date:</label>
                                    <input 
                                        type="date" 
                                        className="form-control" 
                                        value={startDate} 
                                        onChange={(event) => setStartDate(event.target.value)}
                                    />
                                </div>
                                <div className="form-group text-white">
                                    <label>Show End Date:</label>
                                    <input 
                                        type="date" 
                                        className="form-control" 
                                        value={endDate} 
                                        onChange={(event) => setEndDate(event.target.value)}
                                    />
                                </div>

                                <div className="form-group text-white">
                                    <label>Show Times:</label><br/>
                                    <label>
                                        <input 
                                            type="checkbox" 
                                            id="time1" 
                                            checked={time1Checked}
                                            onChange={(event) => setTime1Checked(event.target.checked)}
                                        />
                                        11:30pm
                                    </label><br/>
                                    <label>
                                        <input 
                                            type="checkbox" 
                                            id="time2" 
                                            checked={time2Checked}
                                            onChange={(event) => setTime2Checked(event.target.checked)}
                                        />
                                        2:30pm
                                    </label><br/>
                                    <label>
                                        <input 
                                            type="checkbox" 
                                            id="time3" 
                                            checked={time3Checked}
                                            onChange={(event) => setTime3Checked(event.target.checked)}
                                        />
                                        5pm
                                    </label><br/>
                                    <label>
                                        <input 
                                            type="checkbox" 
                                            id="time4" 
                                            checked={time4Checked}
                                            onChange={(event) => setTime4Checked(event.target.checked)}
                                        />
                                        9pm
                                    </label>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-block btn-dark" onClick={addMovie}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddMovie;
