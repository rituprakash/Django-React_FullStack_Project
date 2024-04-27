
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch hook
import { setUser } from '../../store/authSlice'; // Import setUser action from authSlice
import checkAuth from '../../components/auth/checkAuth';
import Navbar from '../userNavbar';

function UserViewMovie() {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const dispatch = useDispatch(); // Get dispatch function from Redux
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/userAccount/view_movie/${movieId}`)
      .then((response) => {
        console.log('API Response:', response.data);
        setMovieData(response.data);
        setDataFetched(true);
        
        // Dispatch action to set the movie title in Redux store
        // dispatch(setUser({ title: response.data.title , token:response.data.token, email:response.data.email, userId:response.data.userId }));
      })
      .catch((error) => {
        console.error('Error fetching movie:', error);
      });
  }, [movieId, dispatch]); // Include dispatch in dependency array

  return (
    <div>
      <Navbar />
      <div
        className="container"
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="row no-gutters">
              <div className="col-md-4">
                <img
                  src={movieData?.image_url}
                  className="card-img"
                  alt={movieData?.title}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{movieData?.title}</h5>
                  <p className="card-text"><strong>Genre:  </strong>{movieData?.genre}</p>
                  <p className="card-text"><strong>Description:  </strong>{movieData?.description}</p>
                  {/* <div><strong>Ticket Price:  </strong>{movieData?.ticket_price}</div> */}
                  
                  {dataFetched && (
                    <Link to={`/BookingForm/${movieId}/${movieData.title}`} className="btn btn-danger mt-5">Book Now</Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(UserViewMovie);