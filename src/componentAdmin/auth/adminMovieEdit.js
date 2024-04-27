
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../adminNavbar";
import { useSelector } from "react-redux";

function AdminEditMovie() {
    const { id } = useParams();
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
    let navigate = useNavigate();
    const user = useSelector(state => state.auth.user); // Get the user from Redux store
    const token = user?.token || ''; // Get the token from user object

    useEffect(() => {
        // Check if the user is authenticated
        if (!user || !user.token) {
            // If not authenticated, navigate to the login page
            navigate("/Admin_Login/");
            return;
        }

        axios.get(`http://127.0.0.1:8000/userAccount/view_movie/${id}/`)
            .then(response => {
                const movieData = response.data;
                setTitle(movieData.title);
                setGenre(movieData.genre);
                setDescription(movieData.description);
                setImageUrl(movieData.image_url);
                setTicketPrice(movieData.ticket_price);
                setStartDate(movieData.startDate);
                setEndDate(movieData.endDate);
                setTime1Checked(movieData.time1 !== "00:00");
                setTime2Checked(movieData.time2 !== "00:00");
                setTime3Checked(movieData.time3 !== "00:00");
                setTime4Checked(movieData.time4 !== "00:00");
            })
            .catch(error => {
                console.error('Error fetching movie data:', error);
            });
    }, [id, navigate, user]);

    function updateMovie() {
        axios.put(`http://127.0.0.1:8000/adminAccount/update_movie/${id}/`, {
            title: title,
            genre: genre,
            description: description,
            image_url: image_url,
            ticket_price: ticket_price,
            startDate: startDate,
            endDate: endDate,
            time1: time1Checked ? '11:30pm' : '00:00',
            time2: time2Checked ? '2:30pm' : '00:00',
            time3: time3Checked ? '5pm' : '00:00',
            time4: time4Checked ? '9pm' : '00:00',
          
        }, {
            headers: {
                'Authorization': `Bearer ${token}` // Include token in the request headers
            }
        })
        .then(response => {
            alert(response.data.message);
            navigate('/AdminListMovie/'); // Redirect to AdminListMovie after successful update
        })
        .catch(error => {
            console.error('Error updating movie:', error);
        });
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center text-danger mt-4">Edit Movie</h1>
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
                                        <label htmlFor="t1">
                                            <input 
                                                type="checkbox" 
                                                id="t1"
                                                name="time1"  
                                                checked={time1Checked}
                                                onChange={(event) => setTime1Checked(event.target.checked)} 
                                            />
                                            11:30pm
                                        </label><br/>
                                        <label htmlFor="t2">
                                            <input 
                                                type="checkbox" 
                                                id="t2"
                                                name="time2"  
                                                checked={time2Checked}
                                                onChange={(event) => setTime2Checked(event.target.checked)} 
                                            />
                                            2:30pm
                                        </label><br/>
                                        <label htmlFor="t3">
                                            <input 
                                                type="checkbox" 
                                                id="t3"
                                                name="time3"  
                                                checked={time3Checked}
                                                onChange={(event) => setTime3Checked(event.target.checked)} 
                                            />
                                            5pm
                                        </label><br/>
                                        <label htmlFor="t4">
                                            <input 
                                                type="checkbox" 
                                                id="t4"
                                                name="time4" 
                                                checked={time4Checked}
                                                onChange={(event) => setTime4Checked(event.target.checked)} 
                                            />
                                            9pm
                                        </label>
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-dark btn-block" onClick={updateMovie}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminEditMovie;
