
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [selectedType, setSelectedType] = useState('user'); // Default to regular user

  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link className="navbar-brand text-light" to="/">Movie Booking</Link>
      <Link className="nav-link text-light mr-2 ml-auto" to="/">Home</Link>
      <Link className="nav-link text-light mr-2" to="/Login">Login</Link>
      <div className="dropdown">
        <button className="btn btn-transparent dropdown-toggle text-light" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Sign Up
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button className="dropdown-item" onClick={() => setSelectedType('user')}>
            <Link className="text-dark" to="/User_Signup/">User</Link>
          </button>
          <button className="dropdown-item" onClick={() => setSelectedType('admin')}>
            <Link className="text-dark" to="/Admin_Signup/">Admin</Link>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;






