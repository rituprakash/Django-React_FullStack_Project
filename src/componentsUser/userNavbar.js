import React from 'react';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'


function Navbar() {

  const user = useSelector((store) => store.auth.user);
  const token = user?.token; // Get token from Redux store
  const userId = user ? user.userId : null;

  return (
    <nav className="navbar navbar-dark bg-dark">
       <Link className="navbar-brand text-light" to="/UserMovieList/">Movie Booking</Link>
       <Link className="nav-link ml-auto  text-light" to="/UserMovieList/">Movies</Link>
       <Link className="nav-link text-light" to={`/BookingHistory/${userId}/`}>My Bookings</Link> 
       <Link className="nav-link text-light" to="/Login/" >Logout</Link>
    </nav>
  );
}

export default Navbar;
