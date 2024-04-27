import React from 'react';
import { Link } from 'react-router-dom';
import AdminLogout from './auth/AdminLogout';


function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
       <Link className="navbar-brand text-light" to="/AdminListMovie">Movie Booking</Link>
       <Link className="nav-link ml-auto  text-light" to="/AdminListMovie">Movies</Link>
       <Link className="nav-link text-light" to="/AddMovie/">Add Movies</Link>
       <Link to="/Login/" onClick={AdminLogout.handleLogout} className="nav-link text-light">Logout</Link>
    </nav>
  );
}

export default Navbar;
